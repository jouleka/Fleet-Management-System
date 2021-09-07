package com.project.fleetmanagementsystem.repos;

import com.project.fleetmanagementsystem.models.VehicleFleet;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface VehicleFleetRepository extends MongoRepository<VehicleFleet, String> {

}
