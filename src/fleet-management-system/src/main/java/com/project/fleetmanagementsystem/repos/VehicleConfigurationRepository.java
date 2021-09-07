package com.project.fleetmanagementsystem.repos;

import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VehicleConfigurationRepository extends MongoRepository<VehicleConfiguration, String> {
    Optional<VehicleConfiguration> findByVehicleName(String vehicleName);
}
