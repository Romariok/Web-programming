package itmo.web.lab3.database;

import itmo.web.lab3.Point;

import java.util.List;

/**
 * @author Romariok on 05.11.2023
 */
public interface DataBase {
    void save(Point point);

    List<Point> getAll();
}
