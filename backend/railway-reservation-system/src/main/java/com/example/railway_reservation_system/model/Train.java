package com.example.railway_reservation_system.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@Table(name = "trains")
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String trainNumber;

    @Column(nullable = false)
    private String trainName;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalTime departureTime;

    @Column(nullable = false)
    private LocalTime arrivalTime;

    @Column(nullable = false)
    private int totalSeats;

    @Column(nullable = false)
    private double fare;

    @OneToMany(mappedBy = "train")
    @JsonManagedReference("train-booking") // Gave this relationship a unique name
    private List<Booking> bookings;
}
