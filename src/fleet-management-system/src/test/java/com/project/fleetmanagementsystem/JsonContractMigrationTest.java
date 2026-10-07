package com.project.fleetmanagementsystem;
import com.project.fleetmanagementsystem.models.*;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;
import static org.junit.jupiter.api.Assertions.*;
class JsonContractMigrationTest {
    private final JsonMapper mapper = JsonMapper.builder().build();
    @Test void fleetCreateRequestKeepsEmptyVehicleCollection() {
        VehicleFleet fleet = mapper.readValue("{\"name\":\"Fleet A\",\"company\":{\"companyName\":\"Test company\"}}", VehicleFleet.class);
        assertEquals("Fleet A", fleet.getName());
        assertNotNull(fleet.getVehicles());
        assertTrue(fleet.getVehicles().isEmpty());
        assertEquals("Test company", fleet.getCompany().getCompanyName());
    }
}
