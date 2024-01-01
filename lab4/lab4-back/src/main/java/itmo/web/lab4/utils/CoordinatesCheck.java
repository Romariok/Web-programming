package itmo.web.lab4.utils;

import itmo.web.lab4.dto.Coordinates;

/**
 * @author Romariok on 10.12.2023
 */
public class CoordinatesCheck {

    public static boolean isHit(Coordinates coordinates) {
        return coordinates != null && isHit(coordinates.getX(), coordinates.getY(), coordinates.getR());
    }

    public static boolean isHit(double x, double y, double r) {
        return isCircleHit(x, y, r) || isRectangleHit(x, y, r) || isTriangleHit(x, y, r);
    }

    private static boolean isTriangleHit(double x, double y, double r) {
        return x <=r && x >=0 && y >=0 && y<=(r-x);
    }

    private static boolean isRectangleHit(double x, double y, double r) {
        return y<=0 && y >=-r && x <=0 && x >=-r;
    }

    private static boolean isCircleHit(double x, double y, double r) {
        return x <=0 && y>=0 &&  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r;
    }
}
