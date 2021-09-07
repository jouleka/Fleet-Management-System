package com.project.fleetmanagementsystem.services;

import com.project.fleetmanagementsystem.models.CompanyConfiguration;
import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.models.VehicleFleet;
import com.project.fleetmanagementsystem.repos.CompanyConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleFleetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class VehicleFleetService {

    @Autowired
    CompanyConfigurationRepository companyConfigurationRepository;

    @Autowired
    VehicleFleetRepository vehicleFleetRepository;

    public ResponseEntity<VehicleFleet> addVehicleFleet(@RequestBody VehicleFleet vehicleFleet) {
//        Optional<VehicleFleet> isVehicleNamePresent = vehicleFleetRepository.findByFleetName(vehicleFleet.getName());
        List<CompanyConfiguration> companyList = companyConfigurationRepository.findAll();

        boolean ispresent = false;

        for (CompanyConfiguration company : companyList) {
            if (company.getCompanyName().equalsIgnoreCase(vehicleFleet.getCompany().getCompanyName())) {
                ispresent = true;
                break;
            }
        }

        if(vehicleFleet.getName().isEmpty() || vehicleFleet.getVehicles().isEmpty() ) {
            return new ResponseEntity<>(vehicleFleet, HttpStatus.BAD_REQUEST);
        }else if(ispresent) {
            vehicleFleetRepository.insert(vehicleFleet);
            return new ResponseEntity<>(vehicleFleet, HttpStatus.OK);
        }
        return new ResponseEntity<>(vehicleFleet, HttpStatus.CONFLICT);
    }

    public ResponseEntity<VehicleFleet> updateVehicleFleet(@RequestBody VehicleFleet vehicleFleet) {
        List<CompanyConfiguration> companyList = companyConfigurationRepository.findAll();

        boolean ispresent = false;

        for (CompanyConfiguration company : companyList) {
            if (company.getCompanyName().equalsIgnoreCase(vehicleFleet.getCompany().getCompanyName())) {
                ispresent = true;
                break;
            }
        }

        if(vehicleFleet.getName().isEmpty() || vehicleFleet.getVehicles().isEmpty()) {
            return new ResponseEntity<>(vehicleFleet, HttpStatus.BAD_REQUEST);
        }else if(ispresent) {
            vehicleFleetRepository.save(vehicleFleet);
            return new ResponseEntity<>(vehicleFleet, HttpStatus.OK);
        }
        return new ResponseEntity<>(vehicleFleet, HttpStatus.OK);
    }
}
