package com.project.fleetmanagementsystem.repos;

import com.project.fleetmanagementsystem.models.VehicleServices;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VehicleServiceRepository extends MongoRepository<VehicleServices, String> {
    Optional<VehicleServices> findByServiceName(String serviceName);
}
