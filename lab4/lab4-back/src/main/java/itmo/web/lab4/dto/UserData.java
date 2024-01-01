package itmo.web.lab4.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author Romariok on 10.12.2023
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserData {
    private String username;
    private String email;
    private String password;

    public UserData encoded(PasswordEncoder encoder) {
        return new UserData(username, email, encoder.encode(password));
    }
}