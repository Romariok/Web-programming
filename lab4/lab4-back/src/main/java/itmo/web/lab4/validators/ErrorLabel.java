package itmo.web.lab4.validators;

/**
 * @author Romariok on 10.12.2023
 */
public enum ErrorLabel {
    INCORRECT_USERNAME_OR_PASSWORD("Incorrect username or password"),
    INVALID_PASSWORD("Password is at least 1 character and includes only letters and numbers"),
    INVALID_LOGIN("Login is at least 1 character and includes only letters and numbers"),
    INVALID_EMAIL("Mail entered incorrectly"),
    USER_ALREADY_EXIST("The user already exists, think of another name or change the email"),
    SESSION_EXPIRED("The token has expired");

    private final String errorMessage;

    ErrorLabel(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}