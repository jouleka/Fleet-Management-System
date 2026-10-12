package com.project.fleetmanagementsystem;

import com.project.fleetmanagementsystem.controllers.VehicleFleetController;
import com.project.fleetmanagementsystem.repos.VehicleFleetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class VehicleFleetDeleteSecurityTest {
    private VehicleFleetRepository repository;
    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        repository = mock(VehicleFleetRepository.class);
        VehicleFleetController controller = new VehicleFleetController();
        ReflectionTestUtils.setField(controller, "vehicleFleetRepository", repository);
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void reflectedMarkupIsOnlyReturnedAsNonSniffablePlainText() throws Exception {
        String id = "<img src=x onerror=alert(1)>";

        mvc.perform(delete("/api/vehicle-fleet/delete/{id}", id).accept(MediaType.ALL))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(content().string("The Vehicle Fleet with Id of" + id + " has been deleted"));

        verify(repository).deleteById(id);
    }

    @Test
    void htmlNegotiationCannotExecuteTheDeletion() throws Exception {
        mvc.perform(delete("/api/vehicle-fleet/delete/{id}", "fleet-1").accept(MediaType.TEXT_HTML))
                .andExpect(status().isNotAcceptable());

        verifyNoInteractions(repository);
    }

    @Test
    void ordinaryTextClientKeepsTheExistingSuccessBody() throws Exception {
        mvc.perform(delete("/api/vehicle-fleet/delete/{id}", "fleet-1").accept(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk())
                .andExpect(content().string("The Vehicle Fleet with Id offleet-1 has been deleted"));

        verify(repository).deleteById("fleet-1");
    }
}
