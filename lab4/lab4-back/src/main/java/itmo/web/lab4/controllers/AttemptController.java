package itmo.web.lab4.controllers;

import itmo.web.lab4.dto.Coordinates;
import itmo.web.lab4.dto.PointStatus;
import itmo.web.lab4.repos.UserRepository;
import itmo.web.lab4.security.jwt.AuthTokenFilter;
import itmo.web.lab4.security.jwt.JwtUtils;
import itmo.web.lab4.security.service.AuthUserDetails;
import itmo.web.lab4.services.PointService;
import itmo.web.lab4.utils.CoordinatesValidation;
import itmo.web.lab4.utils.OutOfCoordinatesRangeException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Romariok on 02.12.2023
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth/attempt")
public class AttemptController {
    private final PointService pointService;
    private final JwtUtils jwtUtils;
    private final AuthTokenFilter authTokenFilter;
    private final UserRepository userRepository;

    @Autowired
    public AttemptController(PointService pointService, JwtUtils jwtUtils, AuthTokenFilter authTokenFilter, UserRepository userRepository) {
        this.pointService = pointService;
        this.jwtUtils = jwtUtils;
        this.authTokenFilter = authTokenFilter;
        this.userRepository = userRepository;
    }

    @PostMapping("")
    public ResponseEntity<?> createPoint(@RequestBody Coordinates pointRequest, HttpServletRequest request) {
        try {
            System.out.println(pointRequest.getX()+" "+pointRequest.getY()+" "+pointRequest.getR()+" \ntoken is: "+jwtUtils.validateJwtToken(pointRequest.getToken()));
            CoordinatesValidation.validate(pointRequest);
            PointStatus PointStatus = pointService.save(pointRequest);
            return new ResponseEntity<>(PointStatus, HttpStatus.CREATED);
        } catch (OutOfCoordinatesRangeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<?> getHits(HttpServletRequest request) {
        List<PointStatus> hits = new ArrayList<>();
        try {
            hits = pointService.findAllByOwnerId(getUserIdFromRequest(request));
            return new ResponseEntity<>(hits, HttpStatus.OK);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping()
    public void deleteAll(HttpServletRequest request) {
        System.out.println("delete");
        pointService.deletePoint(getUserIdFromRequest(request));
    }



    private Long getUserIdFromRequest(HttpServletRequest request) {
        AuthUserDetails userDetails = (AuthUserDetails) authTokenFilter.getUserDetails(request);
        return userDetails.getId();
    }

}