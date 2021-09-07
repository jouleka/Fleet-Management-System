package com.project.fleetmanagementsystem.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "VehicleConfiguration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleConfiguration {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String vehicleName;
    @NonNull
    private CompanyConfiguration company;

    private List<VehicleServices> vehicleServices = new ArrayList<>();

    @NonNull
    private Double consuptionInLiters;
    @NonNull
    private Double vehicleEngine;
}
