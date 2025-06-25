package com.example.railway_reservation_system.repository;

import com.example.railway_reservation_system.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Passenger entity.
 * It provides CRUD operations for the Passenger model.
 */
@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // This repository is intentionally left empty.
    // JpaRepository provides all the necessary basic CRUD methods like save(), findById(), findAll(), deleteById() etc.
    // You can add custom query methods here later if needed.
}
