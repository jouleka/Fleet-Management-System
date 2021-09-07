package com.project.fleetmanagementsystem.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "VehicleServices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleServices {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String serviceName;
    @NonNull
    private Double timeFrequency;
    @NonNull
    private Double kilometerFrequency;
    private String description;

}
