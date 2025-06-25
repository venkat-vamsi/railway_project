package com.example.railway_reservation_system.controller;

import com.example.railway_reservation_system.model.Booking;
import com.example.railway_reservation_system.service.BookingService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final String keyId;
    private final String keySecret;
    private final BookingService bookingService;

    // Using Constructor Injection for dependencies
    public PaymentController(
            @Value("${razorpay.key.id}") String keyId,
            @Value("${razorpay.key.secret}") String keySecret,
            BookingService bookingService) {
        this.keyId = keyId;
        this.keySecret = keySecret;
        this.bookingService = bookingService;
    }

    @PostMapping("/create_order")
    public ResponseEntity<?> createOrder(@RequestBody Booking bookingRequest) throws RazorpayException {
        // Step 1: Create a PENDING booking in our database. This returns the saved booking with its new ID.
        Booking pendingBooking = bookingService.createPendingBooking(bookingRequest);

        // Step 2: Create a Razorpay order using the details from our pending booking.
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", pendingBooking.getTotalFare() * 100); // Amount in the smallest currency unit (paise)
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "booking_rcpt_" + pendingBooking.getId()); // Use our internal booking ID as the receipt

        Order order = razorpayClient.orders.create(orderRequest);

        // Step 3: Update our pending booking with the Razorpay Order ID so we can find it later.
        pendingBooking.setRazorpayOrderId(order.get("id"));
        bookingService.updateBookingStatus(pendingBooking.getId(), null, null, "PENDING");

        // Step 4: Send the Razorpay order details back to the frontend.
        return ResponseEntity.ok(order.toString());
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> payload) {
        try {
            String paymentId = payload.get("razorpay_payment_id");
            String orderId = payload.get("razorpay_order_id");
            String signature = payload.get("razorpay_signature");
            Long bookingId = Long.parseLong(payload.get("booking_id"));

            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            // Use Razorpay's utility to verify the signature
            boolean isValid = Utils.verifyPaymentSignature(options, keySecret);

            if (isValid) {
                // If payment is authentic, update our booking status to SUCCESS
                bookingService.updateBookingStatus(bookingId, paymentId, signature, "SUCCESS");
                return ResponseEntity.ok(Map.of("status", "success", "message", "Payment verified successfully."));
            } else {
                // If signature is not valid, mark the booking as FAILED
                bookingService.updateBookingStatus(bookingId, paymentId, signature, "FAILED");
                return ResponseEntity.badRequest().body(Map.of("status", "failure", "message", "Payment verification failed."));
            }
        } catch (RazorpayException e) {
            // Handle exceptions from the Razorpay library
            return ResponseEntity.internalServerError().body(Map.of("status", "error", "message", "Error verifying payment."));
        }
    }
}
