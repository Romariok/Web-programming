package itmo.web.lab4.utils;

import itmo.web.lab4.dto.Coordinates;

/**
 * @author Romariok on 11.12.2023
 */
public class CoordinatesValidation {
    static public void validate(Coordinates coordinates) throws OutOfCoordinatesRangeException {
        validateVariable("X", coordinates.getX(), Range.X_RANGE);
        validateVariable("Y", coordinates.getY(), Range.Y_RANGE);
        validateVariable("R", coordinates.getR(), Range.R_RANGE);
    }

    static private void validateVariable(String varName, double var, Range Range) throws OutOfCoordinatesRangeException {
        if (var < Range.getLeft() || var > Range.getRight()) {
            if (var == Range.getLeft() || var == Range.getRight())
                return;

            throw new OutOfCoordinatesRangeException(varName, var, Range);
        }
    }
}