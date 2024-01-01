package itmo.web.lab4.security.service;


import itmo.web.lab4.models.User;
import itmo.web.lab4.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Romariok on 11.12.2023
 */
@Service
public class AuthUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public AuthUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByName(username);
        System.out.println(user.get().getName());
        if (!user.isPresent())
            throw new UsernameNotFoundException("User Not Found with username: " + username);

        return AuthUserDetails.build(user.get());
    }

}