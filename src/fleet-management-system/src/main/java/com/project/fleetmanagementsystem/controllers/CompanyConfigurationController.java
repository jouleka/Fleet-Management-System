package com.project.fleetmanagementsystem.controllers;

import com.project.fleetmanagementsystem.models.CompanyConfiguration;
import com.project.fleetmanagementsystem.models.VehicleConfiguration;
import com.project.fleetmanagementsystem.repos.CompanyConfigurationRepository;
import com.project.fleetmanagementsystem.services.CompanyConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/company")
public class CompanyConfigurationController {

    @Autowired
    CompanyConfigurationRepository companyConfigurationRepository;

    @Autowired
    CompanyConfigurationService companyConfigurationService;

    @GetMapping("/list")
    public List<CompanyConfiguration> getAllInfo() {
        return companyConfigurationRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public Optional<CompanyConfiguration> getInfoById(@PathVariable String id) {
        return companyConfigurationRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<CompanyConfiguration> addCompany(@RequestBody CompanyConfiguration companyConfiguration) {
        return companyConfigurationService.companyAdd(companyConfiguration);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CompanyConfiguration> updateCompany(@RequestBody CompanyConfiguration companyConfiguration) {
          return companyConfigurationService.companyUpdate(companyConfiguration);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCompany(@PathVariable String id) {
        return companyConfigurationService.deleteCompany(id);
    }
}

