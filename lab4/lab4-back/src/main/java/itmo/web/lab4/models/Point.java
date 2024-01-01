package itmo.web.lab4.models;

import itmo.web.lab4.dto.PointStatus;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Romariok on 02.12.2023
 */
@Data
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@Table(name="point")
public class Point implements Serializable {
    @Transient
    private static final long serialVersionUID = 4966854900724741060L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private double r;
    @Column(name = "coordsstatus", nullable = false)
    private boolean status;
    @Column(insertable=false, updatable=false)
    private Long user_id;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    public Point(Double x, Double y, Double r, boolean hit, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = hit;
        this.user_id = user.getId();
        this.user = user;
    }
    public PointStatus toPointStatus() {
        return new PointStatus(x, y, r, status);
    }
}
