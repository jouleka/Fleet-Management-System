package com.project.fleetmanagementsystem.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "VehicleFleet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleFleet {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String name;
    @NonNull
    private CompanyConfiguration company;

    private List<VehicleConfiguration> vehicles = new ArrayList<>();

}
