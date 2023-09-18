package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.Role;
import rs.raf.demo.repositories.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IService<Role, Long> {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(@Qualifier("roleRepository") RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public <S extends Role> S save(S role) {
        return roleRepository.save(role);
    }

    @Override
    public Optional<Role> findById(Long roleID) {
        return roleRepository.findById(roleID);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public void deleteById(Long roleID) {
        roleRepository.deleteById(roleID);
    }
}

