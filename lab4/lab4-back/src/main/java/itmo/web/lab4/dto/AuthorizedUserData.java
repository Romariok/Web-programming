package itmo.web.lab4.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Romariok on 10.12.2023
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorizedUserData {
    private String name;
    private String token;
}