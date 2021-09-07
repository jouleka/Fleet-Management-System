package com.project.fleetmanagementsystem.controllers;

import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.repos.VehicleConfigurationRepository;
import com.project.fleetmanagementsystem.services.VehicleConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/vehicle-configuration")
public class VehicleConfigurationController {

    @Autowired
    VehicleConfigurationService vehicleConfigurationService;

    @Autowired
    VehicleConfigurationRepository vehicleConfigurationRepository;

    @GetMapping("/list")
    public List<VehicleConfiguration> getAllInfo() {
        return vehicleConfigurationRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public Optional<VehicleConfiguration> getInfoById(@PathVariable String id) {
        return vehicleConfigurationRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<VehicleConfiguration> addVehicleConfig(@RequestBody VehicleConfiguration vehicleConfiguration) {
        return vehicleConfigurationService.vehicleConfig(vehicleConfiguration);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VehicleConfiguration> updateVehicleConfig( @PathVariable String id, @RequestBody VehicleConfiguration vehicleConfiguration) {
        return vehicleConfigurationService.updateVehicleconfig(vehicleConfiguration);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVehicleConfig(@PathVariable String id) {
        vehicleConfigurationService.deleteVehicleConfig(id);
    }
}
