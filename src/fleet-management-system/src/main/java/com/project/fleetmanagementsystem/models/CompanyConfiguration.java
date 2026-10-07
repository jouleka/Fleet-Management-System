package com.project.fleetmanagementsystem.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;

@Document(collection = "CompanyConfiguration")
@Getter
@Setter
@NoArgsConstructor(onConstructor_ = @JsonCreator)
@AllArgsConstructor
public class CompanyConfiguration {
    @Id
    private String id;
//    @DBRef
    @NonNull
    @Indexed(unique = true)
    private String companyName;

    private String companyLogo;

    @NonNull
    private String address;

    @NonNull
    @Email(regexp = "[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}")
    private String email;
    private String description;


}
