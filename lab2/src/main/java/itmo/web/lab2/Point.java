package itmo.web.lab2;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * @author Romariok on 06.10.2023
 */
public class Point {
    private final double x;
    private final double y;
    private final double r;
    private final double execTime;
    private final boolean status;
    private SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

    public Point(double x, double y, double r, double execTime){
        this.x = x;
        this.y = y;
        this.r = r;
        this.execTime = execTime;
        this.status = checkCoordinates(x ,y, r);
    }

    private boolean checkCoordinates(double x, double y, double r){
        return ((y<=0 && y >=(-r/2) && x>=0 && x <=r) || (x>=(y/2 - r/2) && x <=0 && y >=0 && y<=r) ||(x >=0 && y>=0 &&  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r / 2));
    }

    public double getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getExecTime() {
        return execTime;
    }

    public boolean checkStatus() {
        return status;
    }


    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if (!(o instanceof Point)) return false;
        Point point = (Point) o;
        return Double.compare(point.x, x) == 0 &&
                Double.compare(point.y, y) == 0 &&
                Double.compare(point.r, r) == 0 &&
                status == point.status;
    }
    @Override
    public String toString() {
        return "<tr><td>" + x + "</td>" +
                "<td>" + y + "</td>" +
                "<td>" + r + "</td>" +
                "<td>" + formatter.format(new Date()) + "</td>"+
                "<td>" + execTime/1_000_000_000.0 + "</td>"+
                "<td style='color: " + ((status) ? "green" : "red") + "'>" + status + "</td></tr>";
    }
}
