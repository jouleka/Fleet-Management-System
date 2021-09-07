package com.project.fleetmanagementsystem.services;

import com.project.fleetmanagementsystem.models.CompanyConfiguration;
import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.models.VehicleFleet;
import com.project.fleetmanagementsystem.repos.CompanyConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleConfigurationRepository;
import com.project.fleetmanagementsystem.repos.VehicleFleetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CompanyConfigurationService {

    @Autowired
    CompanyConfigurationRepository companyConfigurationRepository;

    @Autowired
    VehicleConfigurationRepository vehicleConfigurationRepository;

    @Autowired
    VehicleFleetRepository vehicleFleetRepository;

    public ResponseEntity<CompanyConfiguration> companyAdd(CompanyConfiguration companyConfiguration) {

        String addressRegex = "[a-zA-Z]+,[a-zA-Z]+,[0-9]+";
        String emailRegex = "[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}";

        Pattern addressPattern = Pattern.compile(addressRegex);
        Pattern emailPattern = Pattern.compile(emailRegex);

        Matcher addressMatcher = addressPattern.matcher(companyConfiguration.getAddress());
        Matcher emailMatcher = emailPattern.matcher(companyConfiguration.getEmail());

        Optional<CompanyConfiguration> isCompanyNamePresent = companyConfigurationRepository.findByCompanyName(companyConfiguration.getCompanyName());

        if (companyConfiguration.getCompanyName().isEmpty() || isCompanyNamePresent.isPresent() ||
                companyConfiguration.getAddress().isEmpty() || !addressMatcher.matches() || !emailMatcher.matches()) {
            return new ResponseEntity<>(companyConfiguration, HttpStatus.BAD_REQUEST);
        }

        companyConfigurationRepository.insert(companyConfiguration);
        return new ResponseEntity<>(companyConfiguration, HttpStatus.OK);
    }

    public ResponseEntity<CompanyConfiguration> companyUpdate(CompanyConfiguration companyConfiguration) {
        List<VehicleConfiguration> vehicleConfigurationList = vehicleConfigurationRepository.findAll();
        List<VehicleFleet> vehicleFleetList = vehicleFleetRepository.findAll();

        String addressRegex = "[a-zA-Z]+,[a-zA-Z]+,[0-9]+";
        String emailRegex = "[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}";

        Pattern addressPattern = Pattern.compile(addressRegex);
        Pattern emailPattern = Pattern.compile(emailRegex);

        Matcher addressMatcher = addressPattern.matcher(companyConfiguration.getAddress());
        Matcher emailMatcher = emailPattern.matcher(companyConfiguration.getEmail());

        Optional<CompanyConfiguration> isCompanyNamePresent = companyConfigurationRepository.findByCompanyName(companyConfiguration.getCompanyName());


        if (companyConfiguration.getCompanyName().isEmpty() || isCompanyNamePresent.isPresent() ||
                companyConfiguration.getAddress().isEmpty() || !addressMatcher.matches() || !emailMatcher.matches()) {
            return new ResponseEntity<>(companyConfiguration, HttpStatus.BAD_REQUEST);
        }


        for(VehicleConfiguration vehicle : vehicleConfigurationList) {
            if (companyConfiguration.getId().equalsIgnoreCase(vehicle.getCompany().getId())) {
                vehicle.setCompany(companyConfiguration);
                vehicleConfigurationRepository.save(vehicle);
            }
        }

        for(VehicleFleet fleet : vehicleFleetList) {
            if (companyConfiguration.getId().equalsIgnoreCase(fleet.getCompany().getId())) {
                fleet.setCompany(companyConfiguration);
                vehicleFleetRepository.save(fleet);
            }
        }

        companyConfigurationRepository.save(companyConfiguration);
        return new ResponseEntity<>(companyConfiguration, HttpStatus.OK);
    }

    //still needs work
    public String deleteCompany(@PathVariable String id) {
        List<VehicleConfiguration> vehicleConfigurationList = vehicleConfigurationRepository.findAll();

        Optional<CompanyConfiguration> companyId = companyConfigurationRepository.findById(id);

        boolean isPresent = false;

            if(companyId.isPresent()) {
                for(VehicleConfiguration vehicle : vehicleConfigurationList) {
                    if (vehicle.getCompany().getCompanyName().equals(companyId.get().getCompanyName())) {
                        isPresent = true;
                        break;
                    }
                }
                if(isPresent) {
                    return "company is present";
                }else {
                    companyConfigurationRepository.deleteById(id);
                }
            }
            return "ok";
    }
}
