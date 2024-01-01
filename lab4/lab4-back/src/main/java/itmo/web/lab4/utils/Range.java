package itmo.web.lab4.utils;

/**
 * @author Romariok on 11.12.2023
 */
public enum Range {
    X_RANGE(-8, 8),
    Y_RANGE(-8, 8),
    R_RANGE(0, 5);

    private final double left;
    private final double right;

    Range(double left, double right) {
        this.left = left;
        this.right = right;
    }

    public double getLeft() {
        return left;
    }

    public double getRight() {
        return right;
    }

}