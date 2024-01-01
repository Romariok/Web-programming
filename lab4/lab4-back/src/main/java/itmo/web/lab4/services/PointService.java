package itmo.web.lab4.services;

/**
 * @author Romariok on 11.12.2023
 */
import itmo.web.lab4.dto.Coordinates;
import itmo.web.lab4.dto.PointStatus;
import itmo.web.lab4.models.Point;
import itmo.web.lab4.models.User;
import itmo.web.lab4.repos.PointRepository;
import itmo.web.lab4.repos.UserRepository;
import itmo.web.lab4.security.jwt.JwtUtils;
import itmo.web.lab4.utils.CoordinatesCheck;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointService {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    private final JwtUtils jwtUtils;

    public List<Point> listPoint(Long id) {
        return pointRepository.findAll();
    }

    @Transactional
    public PointStatus save(Coordinates coordinates) {
        boolean isHit = CoordinatesCheck.isHit(coordinates);
        PointStatus PointStatus = new PointStatus(coordinates, isHit);

        Point Point = new Point(coordinates.getX(),coordinates.getY(),coordinates.getR(), isHit, userRepository.getUserByName(jwtUtils.getUserNameFromJwtToken(coordinates.getToken())));
        pointRepository.save(Point);
        return PointStatus;
    }

    @Transactional
    public User getUserByPrincipal(Principal principal) {
        if (principal == null) return new User();
        return userRepository.findByEmail(principal.getName());
    }

    @Transactional
    public List<PointStatus> findAllByOwnerId(Long id) {
        return pointRepository.findByUserId(id).stream()
                .map(Point::toPointStatus).collect(Collectors.toList());
    }



    @Transactional
    public void deletePoint(Long id) {
        System.out.println("Delete "+id);
        pointRepository.deleteByUserId(id);
    }

    public Point getPointById(Long id) {
        return pointRepository.findById(id).orElse(null);
    }
}