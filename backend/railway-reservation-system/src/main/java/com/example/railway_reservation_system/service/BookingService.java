package com.example.railway_reservation_system.service;

import com.example.railway_reservation_system.model.Booking;
import com.example.railway_reservation_system.model.Train;
import com.example.railway_reservation_system.repository.BookingRepository;
import com.example.railway_reservation_system.repository.TrainRepository;
import com.example.railway_reservation_system.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TrainRepository trainRepository;
    private final UserRepository userRepository;

    // --- CONSTRUCTOR INJECTION ---
    public BookingService(BookingRepository bookingRepository, TrainRepository trainRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.trainRepository = trainRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking createPendingBooking(Booking bookingRequest) {
        Train train = trainRepository.findById(bookingRequest.getTrain().getId())
                .orElseThrow(() -> new RuntimeException("Train not found"));
        userRepository.findById(bookingRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (train.getTotalSeats() < bookingRequest.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        train.setTotalSeats(train.getTotalSeats() - bookingRequest.getNumberOfSeats());
        trainRepository.save(train);

        bookingRequest.setPaymentStatus("PENDING");
        bookingRequest.setTotalFare(train.getFare() * bookingRequest.getNumberOfSeats());

        return bookingRepository.save(bookingRequest);
    }

    @Transactional
    public void updateBookingStatus(Long bookingId, String paymentId, String signature, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setPaymentStatus(status);
        booking.setRazorpayPaymentId(paymentId);
        booking.setRazorpaySignature(signature);

        bookingRepository.save(booking);

        if ("FAILED".equals(status)) {
            Train train = booking.getTrain();
            train.setTotalSeats(train.getTotalSeats() + booking.getNumberOfSeats());
            trainRepository.save(train);
        }
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
