package com.project.fleetmanagementsystem.services;

import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.models.VehicleServices;
import com.project.fleetmanagementsystem.repos.VehicleConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

@Service
public class VehicleServiceServices {

    @Autowired
    VehicleServiceRepository vehicleServiceRepository;

    @Autowired
    VehicleConfigurationRepository vehicleConfigurationRepository;

    public ResponseEntity<VehicleServices> addService(@RequestBody VehicleServices vehicleServices) {
        Optional<VehicleServices> IsVehicleServicePresent = vehicleServiceRepository.findByServiceName(vehicleServices.getServiceName());

        if (vehicleServices.getServiceName().isEmpty() || vehicleServices.getKilometerFrequency().isNaN() || vehicleServices.getTimeFrequency().isNaN()
                || IsVehicleServicePresent.isPresent()) {
            return new ResponseEntity<>(vehicleServices, HttpStatus.BAD_REQUEST);
        }
        System.out.println(vehicleServices);
        vehicleServiceRepository.insert(vehicleServices);
        return new ResponseEntity<>(vehicleServices, HttpStatus.OK);
    }

    public ResponseEntity<VehicleServices> updateService(@RequestBody VehicleServices vehicleServices) {

        Optional<VehicleServices> IsVehicleServicePresent = vehicleServiceRepository.findByServiceName(vehicleServices.getServiceName());
        List<VehicleConfiguration> vehicleConfigurationList = vehicleConfigurationRepository.findAll();

        if (vehicleServices.getServiceName().isEmpty() || vehicleServices.getKilometerFrequency().isNaN() || vehicleServices.getTimeFrequency().isNaN()
            || IsVehicleServicePresent.isPresent()) {
            return new ResponseEntity<>(vehicleServices, HttpStatus.BAD_REQUEST);
        }

        for(VehicleConfiguration vehicle : vehicleConfigurationList) {
            List<VehicleServices> vehicleServicesList = vehicle.getVehicleServices();
            for(VehicleServices service : vehicleServicesList) {
                if (service.getServiceName().equalsIgnoreCase(vehicleServices.getServiceName())) {
                    service.setServiceName(vehicleServices.getServiceName());
                    service.setDescription(vehicleServices.getDescription());
                    service.setKilometerFrequency(vehicleServices.getKilometerFrequency());
                    service.setTimeFrequency(vehicleServices.getTimeFrequency());
                }
            }
            vehicle.setVehicleServices(vehicleServicesList);
            vehicleConfigurationRepository.save(vehicle);
        }

        System.out.println(vehicleServices);
        vehicleServiceRepository.save(vehicleServices);
        return new ResponseEntity<>(vehicleServices, HttpStatus.OK);
    }

    public void deleteVehicleService(String id) {
        List<VehicleConfiguration> vehicleConfigurationList = vehicleConfigurationRepository.findAll();

        Optional<VehicleServices> vehicleServicesId = vehicleServiceRepository.findById(id);

        for (VehicleConfiguration vehicle : vehicleConfigurationList) {

            List<VehicleServices> vehicleServicesList = vehicle.getVehicleServices();

            vehicleServicesList.removeIf(vehicleServices -> vehicleServices.getServiceName().equalsIgnoreCase(vehicleServicesId.get().getServiceName()));
            vehicle.setVehicleServices(vehicleServicesList);
            vehicleConfigurationRepository.save(vehicle);
        }
        vehicleServiceRepository.deleteById(id);
    }
}
