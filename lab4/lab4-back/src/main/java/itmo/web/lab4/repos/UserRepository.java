package itmo.web.lab4.repos;

import itmo.web.lab4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Romariok on 02.12.2023
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);
    User findByEmail(String email);
    Optional<User> findById(Long id);
    User getUserByName(String name);
}