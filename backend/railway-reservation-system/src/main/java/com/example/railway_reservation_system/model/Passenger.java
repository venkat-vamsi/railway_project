package com.example.railway_reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "passengers")
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String gender;
}
