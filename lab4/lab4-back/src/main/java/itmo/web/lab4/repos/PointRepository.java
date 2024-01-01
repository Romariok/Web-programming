package itmo.web.lab4.repos;


import itmo.web.lab4.models.Point;
import itmo.web.lab4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @author Romariok on 10.12.2023
 */
public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByUser(User user);

    List<Point> findByUserId(Long id);

    void deleteByUser(Optional<User> user);

    @Modifying
    @Query("DELETE FROM Point e WHERE e.user_id = :user_id")
    void deleteByUserId(@Param("user_id") Long user_id);

}