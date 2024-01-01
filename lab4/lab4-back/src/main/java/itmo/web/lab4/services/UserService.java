package itmo.web.lab4.services;

import itmo.web.lab4.dto.AuthorizedUserData;
import itmo.web.lab4.dto.UserData;
import itmo.web.lab4.models.User;
import itmo.web.lab4.repos.UserRepository;
import itmo.web.lab4.security.jwt.JwtUtils;
import itmo.web.lab4.validators.ErrorLabel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author Romariok on 02.12.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public ErrorLabel createUser(UserData userData){
        if(userRepository.findByName(userData.getUsername()).isPresent()) return ErrorLabel.USER_ALREADY_EXIST;
        if(userRepository.findByEmail(userData.getEmail())!=null) return ErrorLabel.USER_ALREADY_EXIST;
        User user = new User(userData.encoded(encoder));
        user.setPassword(passwordEncoder.encode(userData.getPassword()));
        log.info("Saving new user with email: {}", user.getEmail());
        userRepository.save(user);
        return null;
    }
    public AuthorizedUserData loginUser(UserData userData) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(userData.getUsername());
        return new AuthorizedUserData(userData.getUsername(), jwtToken);
    }
}