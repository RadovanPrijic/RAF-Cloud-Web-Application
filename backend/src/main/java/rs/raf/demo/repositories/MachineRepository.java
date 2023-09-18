package rs.raf.demo.repositories;

import org.springframework.data.jpa.repository.Lock;
import org.springframework.transaction.annotation.Transactional;
import rs.raf.demo.model.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.raf.demo.model.User;

import javax.persistence.LockModeType;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Transactional
    Optional<Machine> findById(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Collection<Machine> findAllByCreatedBy (User user);
}