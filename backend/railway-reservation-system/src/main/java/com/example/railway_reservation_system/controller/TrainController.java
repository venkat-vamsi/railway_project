package com.example.railway_reservation_system.controller;

import com.example.railway_reservation_system.model.Train;
import com.example.railway_reservation_system.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trains")
public class TrainController {

    @Autowired
    private TrainService trainService;

    @GetMapping
    public List<Train> getAllTrains() {
        return trainService.getAllTrains();
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Train addTrain(@RequestBody Train train) {
        return trainService.addTrain(train);
    }

    @GetMapping("/search")
    public List<Train> findTrains(@RequestParam String source, @RequestParam String destination) {
        return trainService.findTrains(source, destination);
    }
}
