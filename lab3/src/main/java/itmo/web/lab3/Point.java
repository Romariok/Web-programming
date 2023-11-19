package itmo.web.lab3;

import lombok.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.*;

/**
 * @author Romariok on 21.10.2023
 */

@Getter
@Setter
@NoArgsConstructor
@ApplicationScoped
@Entity
@Table(name="point")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private int id;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private double r;
    @Column(name = "borndate", nullable = false)
    private Date bornDate;
    @Column(name = "coordsstatus", nullable = false)
    private boolean status;
    public Point(Point point){
        this.id = point.id;
        this.x = point.getX();
        this.y = point.getY();
        this.r = point.getR();
        this.status = checkCoordinates(x, y, r);
        this.bornDate = point.getBornDate();
    }

    private boolean checkCoordinates(double x, double y, double r){
        return ((y>=0 && y <=r && x >=0 && x <=(r/2)) ||
                (x >=-(r+y) && x <=0 && y <=0 && y>=-r) ||
                (x >=0 && y<=0 &&  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r ));
    }

    public String getStringSuccess() {
        return status ? "Hit" : "Miss";
    }
    public String getColor(){
        return status ? "green" : "red";
    }

}
