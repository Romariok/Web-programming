package itmo.web.lab4.dto;


import lombok.*;

/**
 * @author Romariok on 10.12.2023
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Coordinates {
    private double x;
    private double y;
    private double r;
    private String token;
}