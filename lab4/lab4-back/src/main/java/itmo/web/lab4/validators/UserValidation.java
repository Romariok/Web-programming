package itmo.web.lab4.validators;

import java.util.regex.Pattern;
/**
 * @author Romariok on 10.12.2023
 */
public class UserValidation {
    public ErrorLabel validateUser(String username, String password, String email) {
        if (!isValidUsername(username)) {
            return ErrorLabel.INVALID_LOGIN;
        }

        if (!isValidPassword(password)) {
            return ErrorLabel.INVALID_PASSWORD;
        }

        if (!isValidEmail(email)) {
            return ErrorLabel.INVALID_EMAIL;
        }
        return null;
    }
    public ErrorLabel validateUser(String username, String password) {
        if (!isValidUsername(username)) {
            return ErrorLabel.INVALID_LOGIN;
        }

        if (!isValidPassword(password)) {
            return ErrorLabel.INVALID_PASSWORD;
        }
        return null;
    }

    private boolean isValidUsername(String username) {
        return username != null && username.matches("[a-zA-Z0-9]+") ;
    }

    private boolean isValidPassword(String password) {
        return password != null && password.length() >= 1 && password.matches("[a-zA-Z0-9]+");
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }
}