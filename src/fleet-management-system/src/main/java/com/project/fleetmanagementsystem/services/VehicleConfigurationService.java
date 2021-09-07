package com.project.fleetmanagementsystem.services;

import com.project.fleetmanagementsystem.models.CompanyConfiguration;
import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.models.VehicleFleet;
import com.project.fleetmanagementsystem.repos.CompanyConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleFleetRepository;
import com.project.fleetmanagementsystem.repos.VehicleServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleConfigurationService {

    @Autowired
    VehicleServiceRepository vehicleServiceRepository;

    @Autowired
    CompanyConfigurationRepository companyConfigurationRepository;

    @Autowired
    CompanyConfigurationService companyConfigurationService;

    @Autowired
    VehicleConfigurationRepository vehicleConfigurationRepository;

    @Autowired
    VehicleFleetRepository vehicleFleetRepository;

    public ResponseEntity<VehicleConfiguration> vehicleConfig(VehicleConfiguration vehicleConfiguration) {

        List<CompanyConfiguration> companyList = companyConfigurationRepository.findAll();
        Optional<VehicleConfiguration> isVehicleNamePresent = vehicleConfigurationRepository.findByVehicleName(vehicleConfiguration.getVehicleName());

        boolean ispresent = false;

        for (CompanyConfiguration company : companyList) {
            if (company.getCompanyName().equalsIgnoreCase(vehicleConfiguration.getCompany().getCompanyName())) {
                ispresent = true;
                break;
            }
        }
        if (vehicleConfiguration.getVehicleName().isEmpty() || isVehicleNamePresent.isPresent()
                || vehicleConfiguration.getConsuptionInLiters().isNaN()
                || vehicleConfiguration.getVehicleEngine().isNaN()) {
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.BAD_REQUEST);
        } else if (ispresent) {
            vehicleConfigurationRepository.insert(vehicleConfiguration);
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<VehicleConfiguration> updateVehicleconfig(@RequestBody VehicleConfiguration vehicleConfiguration) {
        List<VehicleFleet> vehicleFleetList = vehicleFleetRepository.findAll();
        Optional<VehicleConfiguration> isVehicleNamePresent = vehicleConfigurationRepository.findByVehicleName(vehicleConfiguration.getVehicleName());
        List<CompanyConfiguration> companyList = companyConfigurationRepository.findAll();
        boolean ispresent = false;

        for (CompanyConfiguration company : companyList) {
            if (company.getCompanyName().equalsIgnoreCase(vehicleConfiguration.getCompany().getCompanyName())) {
                ispresent = true;
                break;
            }
        }

        for(VehicleFleet fleet : vehicleFleetList) {
            List<VehicleConfiguration> vehicleList = fleet.getVehicles();
            for(VehicleConfiguration vehicle : vehicleList) {
                if (vehicle.getVehicleName().equalsIgnoreCase(vehicleConfiguration.getVehicleName())) {
                    vehicle.setVehicleServices(vehicleConfiguration.getVehicleServices());
                    vehicle.setVehicleName(vehicleConfiguration.getVehicleName());
                    vehicle.setCompany(vehicleConfiguration.getCompany());
                    vehicle.setConsuptionInLiters(vehicleConfiguration.getConsuptionInLiters());
                    vehicle.setVehicleEngine(vehicleConfiguration.getVehicleEngine());
                }
            }
            fleet.setVehicles(vehicleList);
            vehicleFleetRepository.save(fleet);
        }

        if (vehicleConfiguration.getVehicleName().isEmpty() || isVehicleNamePresent.isPresent()
                || vehicleConfiguration.getConsuptionInLiters().isNaN()
                || vehicleConfiguration.getVehicleEngine().isNaN()) {
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.BAD_REQUEST);
        } else if (ispresent) {
            vehicleConfigurationRepository.save(vehicleConfiguration);
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(vehicleConfiguration, HttpStatus.CONFLICT);
        }

    }

    public void deleteVehicleConfig(@PathVariable String id) {
        List<VehicleFleet> vehicleFleetList = vehicleFleetRepository.findAll();
        Optional<VehicleConfiguration> vehicleConfigurationId = vehicleConfigurationRepository.findById(id);

        for(VehicleFleet fleet : vehicleFleetList) {
            List<VehicleConfiguration> vehicleConfigurationList = fleet.getVehicles();

            vehicleConfigurationList.removeIf(vehicleConfiguration -> vehicleConfiguration.getVehicleName().equalsIgnoreCase(vehicleConfigurationId.get().getVehicleName()));
            fleet.setVehicles(vehicleConfigurationList);
            vehicleFleetRepository.save(fleet);
        }
        vehicleConfigurationRepository.deleteById(id);

//        if(vehicleConfiguration.isPresent()){
//            vehicleConfiguration.get().getVehicleServices().forEach(vehicleService -> {
//                vehicleServiceRepository.delete(vehicleService);
//            });
//            vehicleConfigurationRepository.deleteById(id);
//            return "ok";
//        }
//        return "null";
    }

//    public Optional<CompanyConfiguration> getCompanyName(@RequestBody CompanyConfiguration companyConfiguration) {
//        Optional<CompanyConfiguration> optional = companyConfigurationRepository.findByCompanyName(companyConfiguration.getCompanyName());
//        return optional;
//    }

//        String companyName = vehicleConfiguration.getCompany().getCompanyName();
//        if(vehicleConfiguration.getVehicleName().isEmpty() || vehicleConfiguration.getCompany() == null
//                || vehicleConfiguration.getVehicleServices() == null || vehicleConfiguration.getConsuptionInLiters().isNaN()
//                || vehicleConfiguration.getConsuptionInLiters() == null || vehicleConfiguration.getVehicleEngine().isNaN()
//                || vehicleConfiguration.getVehicleEngine() == null || !companyName.equals(getCompanyName(vehicleConfiguration.getCompany()).isPresent())) {
//            return null;
//        }
//        vehicleConfigurationRepository.insert(vehicleConfiguration);
//        return "Added Vehicle Configuration Id: " + vehicleConfiguration.getId();

}
