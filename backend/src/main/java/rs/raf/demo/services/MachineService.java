package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.raf.demo.model.ErrorMessage;
import rs.raf.demo.model.Machine;
import rs.raf.demo.model.Status;
import rs.raf.demo.repositories.ErrorMessageRepository;
import rs.raf.demo.repositories.MachineRepository;
import rs.raf.demo.repositories.UserRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class MachineService implements IService<Machine, Long>{
    private final MachineRepository machineRepository;
    private final UserRepository userRepository;
    private final ErrorMessageRepository errorMessageRepository;
    private final TaskScheduler taskScheduler;
    private Random random;

    @Autowired
    public MachineService(@Qualifier("machineRepository") MachineRepository machineRepository, UserRepository userRepository,
                          ErrorMessageRepository errorMessageRepository, TaskScheduler taskScheduler) {
        this.machineRepository = machineRepository;
        this.userRepository = userRepository;
        this.errorMessageRepository = errorMessageRepository;
        this.taskScheduler = taskScheduler;
        random = new Random();
    }

    @Transactional
    public Collection<Machine> search(String userEmail, String name, List<String> statusList, LocalDate dateFrom, LocalDate dateTo){
        ArrayList<Machine> machines = (ArrayList<Machine>) findAllByUser(userEmail);
        ArrayList<Machine> filteredMachines = new ArrayList<>();
        boolean flag;

        for(Machine machine : machines){
            flag = false;
            if(machine.getName().toLowerCase().contains(name.toLowerCase())){
                if(statusList != null){
                    if(!statusList.contains(machine.getStatus().toString()))
                        flag = true;
                }
                if(dateFrom != null && dateTo != null){
                    if(!(machine.getCreationDate().isAfter(dateFrom) && machine.getCreationDate().isBefore(dateTo)))
                        flag = true;
                }
                if(!flag)
                    filteredMachines.add(machine);
            }
        }
        return filteredMachines;
    }

    @Async
    @Transactional
    public void start(Long id, boolean scheduled){
        Optional<Machine> optionalMachine = machineRepository.findById(id);
        if(optionalMachine.isPresent()) {
            Machine machine = optionalMachine.get();
            if(machine.isActive()) {
                if (machine.getStatus() == Status.STOPPED) {
                    try {
                        System.err.println("START POCETAK");
                        Thread.sleep(10000 + (long)((random.nextInt(9)+1) * 1000));
                        machine.setStatus(Status.RUNNING);
                        machineRepository.save(machine);
                        System.err.println("START KRAJ");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else
                    if(scheduled)
                        errorMessageRepository.save(new ErrorMessage(0L,
                                "The machine's status is not 'STOPPED'.", "START",
                                LocalDate.now(), machine));
            } else
                if(scheduled)
                    errorMessageRepository.save(new ErrorMessage(0L,
                            "The machine is deactivated.", "START",
                            LocalDate.now(), machine));
        }
    }

    @Async
    @Transactional
    public void stop(Long id, boolean scheduled){
        Optional<Machine> optionalMachine = machineRepository.findById(id);
        if(optionalMachine.isPresent()) {
            Machine machine = optionalMachine.get();
            if(machine.isActive()) {
                if (machine.getStatus() == Status.RUNNING) {
                    try {
                        System.err.println("STOP POCETAK");
                        Thread.sleep(10000 + (long)((random.nextInt(9)+1) * 1000));
                        machine.setStatus(Status.STOPPED);
                        machineRepository.save(machine);
                        System.err.println("STOP KRAJ");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else
                    if(scheduled)
                        errorMessageRepository.save(new ErrorMessage(0L,
                                "The machine's status is not 'RUNNING'.", "STOP",
                                LocalDate.now(), machine));
            } else
                if(scheduled)
                    errorMessageRepository.save(new ErrorMessage(0L,
                            "The machine is deactivated.", "STOP",
                            LocalDate.now(), machine));
        }
    }

    @Async
    @Transactional
    public void restart(Long id, boolean scheduled){
        Optional<Machine> optionalMachine = machineRepository.findById(id);
        if(optionalMachine.isPresent()) {
            Machine machine = optionalMachine.get();
            if(machine.isActive()) {
                long rand = ((random.nextInt(9)+1) * 1000)/2;
                if (machine.getStatus() == Status.RUNNING) {
                    try {
                        System.err.println("RESTART POCETAK");
                        Thread.sleep(5000 + rand);
                        machine.setStatus(Status.STOPPED);
                        machineRepository.save(machine);
                        System.err.println("RESTART SREDINA");
                        machine = machineRepository.findById(id).get();
                        Thread.sleep(5000 + rand);
                        machine.setStatus(Status.RUNNING);
                        machineRepository.save(machine);
                        System.err.println("RESTART KRAJ");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else
                    if(scheduled)
                        errorMessageRepository.save(new ErrorMessage(0L,
                                "The machine's status is not 'RUNNING'.", "RESTART",
                                LocalDate.now(), machine));
            } else
                if(scheduled)
                    errorMessageRepository.save(new ErrorMessage(0L,
                            "The machine is deactivated.", "RESTART",
                            LocalDate.now(), machine));
        }
    }

    public Machine create(String name, String userEmail){
        return machineRepository.save(new Machine(0L, name, Status.STOPPED, userRepository.findByEmail(userEmail),
                true, LocalDate.now()));
    }

    @Transactional
    public void destroy(Long id){
        Optional<Machine> optionalMachine = machineRepository.findById(id);
        if(optionalMachine.isPresent()){
            Machine machine = optionalMachine.get();
            if (machine.getStatus() == Status.STOPPED) {
                machine.setActive(false);
                machineRepository.save(machine);
            }
        }
    }

    @Transactional
    public void schedule(Long id, String operation, String date, String time) throws ParseException {
        Date dateTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(date + " " + time);
        this.taskScheduler.schedule(() -> {
            if(operation.equalsIgnoreCase("START"))
                this.start(id, true);
            if(operation.equalsIgnoreCase("STOP"))
                this.stop(id, true);
            if(operation.equalsIgnoreCase("RESTART"))
                this.restart(id, true);
        }, dateTime);
    }

    @Transactional
    public Collection<Machine> findAllByUser(String userEmail){
        return machineRepository.findAllByCreatedBy(userRepository.findByEmail(userEmail));
    }

    @Transactional
    public Collection<ErrorMessage> findAllErrorsForUser(String userEmail){
        return errorMessageRepository.findAllByMachine_CreatedBy(userRepository.findByEmail(userEmail));
    }

    @Override
    @Transactional
    public Optional<Machine> findById(Long machineID) {
        return machineRepository.findById(machineID);
    }

    @Override
    public List<Machine> findAll() {
        return machineRepository.findAll();
    }

    @Override
    public <S extends Machine> S save(S machine) {
        return machineRepository.save(machine);
    }

    @Override
    public void deleteById(Long machineID) {
        machineRepository.deleteById(machineID);
    }
}
