package com.example.railway_reservation_system.controller;

import com.example.railway_reservation_system.model.Booking;
import com.example.railway_reservation_system.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Note: The @PostMapping("/create") endpoint has been moved.
    // The booking creation process is now initiated via the PaymentController's
    // "/api/payment/create_order" endpoint to properly handle the payment flow.

    /**
     * Endpoint to get all bookings for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of the user's bookings.
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    /**
     * Endpoint for admins to get a list of all bookings in the system.
     *
     * @return A list of all bookings.
     */
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Note: The @DeleteMapping("/cancel/{bookingId}") has been removed for now.
    // A proper cancellation feature would require handling refunds through the
    // Razorpay API, which is a more complex implementation.
}
