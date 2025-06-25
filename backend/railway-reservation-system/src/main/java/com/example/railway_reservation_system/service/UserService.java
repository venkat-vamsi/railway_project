package com.example.railway_reservation_system.service;

import com.example.railway_reservation_system.model.User;
import com.example.railway_reservation_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for user-related operations.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Finds a user by their email address.
     * This is useful for fetching user details (like roles and ID) after authentication.
     *
     * @param email The email of the user to find.
     * @return The User object if found, otherwise throws a RuntimeException.
     */
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
