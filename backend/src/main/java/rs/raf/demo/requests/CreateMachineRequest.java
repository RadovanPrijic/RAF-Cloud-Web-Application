package rs.raf.demo.requests;

import lombok.Data;

@Data
public class CreateMachineRequest {
    private String name;
    private String userEmail;
}
