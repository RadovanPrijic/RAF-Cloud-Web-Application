package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.Role;
import rs.raf.demo.model.User;
import rs.raf.demo.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IService<User, Long>, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("userRepository") UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User myUser = this.userRepository.findByEmail(email);
        if(myUser == null) {
            throw new UsernameNotFoundException("Email "+email+" has not been found.");
        }
        return new org.springframework.security.core.userdetails.User(myUser.getEmail(), myUser.getPassword(), new ArrayList<>());
    }

    public User returnUserObject(String email) {
        User myUser = this.userRepository.findByEmail(email);
        return myUser;
    }

    @Override
    public <S extends User> S save(S user) {
        return userRepository.save(user);
    }

    public User createUser(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        Collection<Role> roles = new ArrayList<>();
        for (Role role: user.getRoles()) {
            roles.add(role);
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        User userToUpdate = userRepository.getById(user.getId());
        userToUpdate.setName(user.getName());
        userToUpdate.setSurname(user.getSurname());
        userToUpdate.setEmail(user.getEmail());
        Collection<Role> roles = new ArrayList<>();
        for (Role role: user.getRoles()) {
            roles.add(role);
        }
        userToUpdate.setRoles(roles);
        return userRepository.save(userToUpdate);
    }

    @Override
    public Optional<User> findById(Long userID) {
        return userRepository.findById(userID);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteById(Long userID) {
        userRepository.deleteById(userID);
    }
}
