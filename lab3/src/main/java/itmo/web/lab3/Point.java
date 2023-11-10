package itmo.web.lab3;

import lombok.*;
import java.io.Serializable;
import java.util.Date;
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
//    @SequenceGenerator(name = "seqGen", sequenceName = "gen_seq", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private int id;
    @Column(name = "x1", nullable = false)
    private boolean x1;
    @Column(name = "x2", nullable = false)
    private boolean x2;
    @Column(name = "x3", nullable = false)
    private boolean x3;
    @Column(name = "x4", nullable = false)
    private boolean x4;
    @Column(name = "x_1", nullable = false)
    private boolean x_1;
    @Column(name = "x_2", nullable = false)
    private boolean x_2;
    @Column(name = "x_3", nullable = false)
    private boolean x_3;
    @Column(name = "x_4", nullable = false)
    private boolean x_4;
    @Column(name = "x0", nullable = false)
    private boolean x0;
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
        this.x0 = point.isX0();
        this.x1 = point.isX1();
        this.x3 = point.isX3();
        this.x2 = point.isX2();
        this.x4 = point.isX4();
        this.x_1 = point.isX_1();
        this.x_3 = point.isX_3();
        this.x_2 = point.isX_2();
        this.x_4 = point.isX_4();
        this.y = point.getY();
        this.r = point.getR();
        this.status = checkCoordinates(calculateValue(x1, x2, x3, x4, x_1, x_2, x_3, x_4, x0), y, r);
        this.bornDate = point.getBornDate();
    }

    private boolean checkCoordinates(double x, double y, double r){
        return ((y>=0 && y <=r && x >=0 && x <=(r/2)) ||
                (x >=-(r+y) && x <=0 && y <=0 && y>=-r) ||
                (x >=0 && y<=0 &&  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r ));
    }

    public double calculateValue(boolean x1, boolean x2, boolean x3, boolean x4, boolean x_1, boolean x_2, boolean x_3, boolean x_4, boolean x0) {
        if (x1) {
            return 1.0;
        } else if (x_1) {
            return -1.0;
        } else if (x0) {
            return 0.0;
        } else if (x2) {
            return 2.0;
        } else if (x_2) {
            return -2.0;
        } else if (x3) {
            return 3.0;
        } else if (x_3) {
            return -3.0;
        } else if (x4) {
            return 4.0;
        } else if (x_4) {
            return -4.0;
        } else {
            return 0.0;
        }
    }
    public String getStringSuccess() {
        return status ? "Hit" : "Miss";
    }
    public String getColor(){
        return status ? "green" : "red";
    }
}
