package com.project.fleetmanagementsystem.repos;

import com.project.fleetmanagementsystem.models.CompanyConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompanyConfigurationRepository extends MongoRepository<CompanyConfiguration, String> {

    Optional<CompanyConfiguration> findByCompanyName(String companyName);

}
