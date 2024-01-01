package itmo.web.lab4.utils;

/**
 * @author Romariok on 11.12.2023
 */
public class OutOfCoordinatesRangeException extends Exception {
    public OutOfCoordinatesRangeException(String coordinateName, double coordinateValue, Range range) {
        super(
                String.format(
                        "Coordinate %s = %.1f is out of bounds: %s%.1f, %.1f%s",
                        coordinateName, coordinateValue,
                        range.getLeft(), range.getRight()
                )
        );
    }
}