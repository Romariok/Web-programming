package itmo.web.lab4.dto;


import lombok.*;

/**
 * @author Romariok on 10.12.2023
 */
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PointStatus {
    private double x;
    private double y;
    private double r;
    private boolean result;

    public PointStatus(Coordinates coordinates, boolean result) {
        this(coordinates.getX(), coordinates.getY(), coordinates.getR(), result);
    }
}