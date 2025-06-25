package com.example.railway_reservation_system.service;

import com.example.railway_reservation_system.model.Train;
import com.example.railway_reservation_system.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {

    @Autowired
    private TrainRepository trainRepository;

    public Train addTrain(Train train) {
        return trainRepository.save(train);
    }

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public List<Train> findTrains(String source, String destination) {
        return trainRepository.findBySourceAndDestination(source, destination);
    }
}

