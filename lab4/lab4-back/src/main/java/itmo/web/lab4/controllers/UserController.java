package itmo.web.lab4.controllers;


import itmo.web.lab4.dto.AuthorizedUserData;
import itmo.web.lab4.dto.UserData;
import itmo.web.lab4.services.UserService;
import itmo.web.lab4.validators.ErrorLabel;
import itmo.web.lab4.validators.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * @author Romariok on 02.12.2023
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> loginUser(@RequestBody UserData userRequest) {
        ErrorLabel errorLabel = new UserValidation().validateUser(userRequest.getUsername(), userRequest.getPassword());
        if(errorLabel!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorLabel.getErrorMessage());
        }
        try {
            AuthorizedUserData credentials = userService.loginUser(userRequest);
            return ResponseEntity.ok().body(credentials);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Неверно указан пароль или логин");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserData userRequest) {
        ErrorLabel ErrorLabel = new UserValidation().validateUser(userRequest.getUsername(), userRequest.getPassword(), userRequest.getEmail());
        if(ErrorLabel!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorLabel.getErrorMessage());
        }
        ErrorLabel userValidation = userService.createUser(userRequest);
        if(userValidation!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userValidation.getErrorMessage());
        }
        return ResponseEntity.ok().body("Success");
    }
}