package com.example.railway_reservation_system.controller;

import com.example.railway_reservation_system.model.User;
import com.example.railway_reservation_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for user-related API endpoints.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Endpoint to fetch a user's details by their email.
     * This is protected and requires the requester to be authenticated.
     *
     * @param email The email of the user to fetch.
     * @return The User object.
     */
    @GetMapping("/email/{email}")
    @PreAuthorize("isAuthenticated()") // Ensures only a logged-in user can access this
    public User getUserByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }
}
