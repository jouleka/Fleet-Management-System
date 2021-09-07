package com.project.fleetmanagementsystem.controllers;

import com.project.fleetmanagementsystem.models.VehicleFleet;
import com.project.fleetmanagementsystem.repos.VehicleFleetRepository;
import com.project.fleetmanagementsystem.services.VehicleFleetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/vehicle-fleet")
public class VehicleFleetController {

    @Autowired
    VehicleFleetRepository vehicleFleetRepository;

    @Autowired
    VehicleFleetService vehicleFleetService;

    @GetMapping("/list")
    public List<VehicleFleet> getAllInfo() {
        return vehicleFleetRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public Optional<VehicleFleet> getInfoById(@PathVariable String id) {
        return vehicleFleetRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<VehicleFleet> addVehicleFleet(@RequestBody VehicleFleet vehicleFleet) {
        return vehicleFleetService.addVehicleFleet(vehicleFleet);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VehicleFleet> updateVehicleFleet(@PathVariable String id, @RequestBody VehicleFleet vehicleFleet) {
        return vehicleFleetService.updateVehicleFleet(vehicleFleet);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVehicleFleet(@PathVariable String id) {
        vehicleFleetRepository.deleteById(id);
        return "The Vehicle Fleet with Id of" + id + " has been deleted";
    }
}
