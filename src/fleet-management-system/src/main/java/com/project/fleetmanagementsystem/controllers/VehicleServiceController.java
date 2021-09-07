package com.project.fleetmanagementsystem.controllers;

import com.project.fleetmanagementsystem.models.VehicleServices;
import com.project.fleetmanagementsystem.repos.VehicleServiceRepository;
import com.project.fleetmanagementsystem.services.VehicleServiceServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RequestMapping("/api/vehicle-services")
@RestController
public class VehicleServiceController {

    @Autowired
    VehicleServiceRepository vehicleServiceRepository;

    @Autowired
    VehicleServiceServices vehicleServiceServices;

    @GetMapping("/list")
    public List<VehicleServices> getAllInfo() {
        return vehicleServiceRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public Optional<VehicleServices> getInfoById(@PathVariable String id) {
        return vehicleServiceRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<VehicleServices> addVehicleService(@RequestBody VehicleServices vehicleServices) {
        return vehicleServiceServices.addService(vehicleServices);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VehicleServices> updateVehicleService(@PathVariable String id, @RequestBody VehicleServices vehicleServices) {
        return vehicleServiceServices.updateService(vehicleServices);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVehicleService(@PathVariable String id) {
       vehicleServiceServices.deleteVehicleService(id);
    }
}
