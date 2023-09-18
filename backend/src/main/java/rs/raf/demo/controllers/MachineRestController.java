package rs.raf.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import rs.raf.demo.model.ErrorMessage;
import rs.raf.demo.model.Machine;
import rs.raf.demo.model.Status;
import rs.raf.demo.requests.CreateMachineRequest;
import rs.raf.demo.requests.ScheduleRequest;
import rs.raf.demo.responses.LoginResponse;
import rs.raf.demo.services.MachineService;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/machines")
public class MachineRestController {
    private final MachineService machineService;

    public MachineRestController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping(value = "/read/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Machine> getAllMachines(@PathParam("userEmail") String userEmail){
        return machineService.findAllByUser(userEmail);
    }

    @GetMapping(value = "/read/filtered",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Machine> getFilteredMachines(
            @PathParam("userEmail") String userEmail,
            @PathParam("name") String name,
            @PathParam("status") String status,
            @PathParam("dateFrom") String dateFrom,
            @PathParam("dateTo") String dateTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<String> statusList = null;
        LocalDate parsedDateFrom = null, parsedDateTo = null;

        if(status != "")
            statusList = new ArrayList<>(Arrays.asList(status.split(",")));
        if(dateFrom != "")
            parsedDateFrom = LocalDate.parse(dateFrom, formatter);
        if(dateTo != "")
            parsedDateTo = LocalDate.parse(dateTo, formatter);

        return machineService.search(userEmail, name, statusList, parsedDateFrom, parsedDateTo);
    }

    @GetMapping(value = "/read/errors",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<ErrorMessage> getErrorHistory(@PathParam("userEmail") String userEmail){
        return machineService.findAllErrorsForUser(userEmail);
    }

    @GetMapping(value = "/start/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> startMachine(@PathVariable Long id){
        Optional<Machine> optionalMachine = machineService.findById(id);
        if(optionalMachine.isPresent() && optionalMachine.get().getStatus() == Status.STOPPED) {
            this.machineService.start(id, false);
            return ResponseEntity.ok(optionalMachine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/stop/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> stopMachine(@PathVariable Long id){
        Optional<Machine> optionalMachine = machineService.findById(id);
        if(optionalMachine.isPresent() && optionalMachine.get().getStatus() == Status.RUNNING) {
            this.machineService.stop(id, false);
            return ResponseEntity.ok(optionalMachine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/restart/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> restartMachine(@PathVariable Long id){
        Optional<Machine> optionalMachine = machineService.findById(id);
        if(optionalMachine.isPresent() && optionalMachine.get().getStatus() == Status.RUNNING) {
            this.machineService.restart(id, false);
            return ResponseEntity.ok(optionalMachine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine createMachine(@Valid @RequestBody CreateMachineRequest createMachineRequest) {
        return machineService.create(createMachineRequest.getName(), createMachineRequest.getUserEmail());
    }

    @PostMapping(value = "/schedule")
    public ResponseEntity<?> scheduleMachineOperation(@RequestBody ScheduleRequest scheduleRequest) {
        try {
            machineService.schedule(scheduleRequest.getId(), scheduleRequest.getOperation(),
                    scheduleRequest.getDate(), scheduleRequest.getTime());
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(401).build();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> destroyMachine(@PathVariable Long id) {
        machineService.destroy(id);
        return ResponseEntity.noContent().build();
    }
}
