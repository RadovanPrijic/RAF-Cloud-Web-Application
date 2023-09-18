package rs.raf.demo.repositories;

import org.springframework.data.jpa.repository.Lock;
import rs.raf.demo.model.ErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.raf.demo.model.User;

import javax.persistence.LockModeType;
import java.util.Collection;

@Repository
public interface ErrorMessageRepository extends JpaRepository<ErrorMessage, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Collection<ErrorMessage> findAllByMachine_CreatedBy (User user);
}
