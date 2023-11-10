package itmo.web.lab3;

import itmo.web.lab3.database.DataBase;
import lombok.Data;

import javax.enterprise.inject.Model;
import javax.inject.Inject;
import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.List;
/**
 * @author Romariok on 21.10.2023
 */
@Model
@Data
public class Bean implements Serializable {
    @Inject
    private DataBase dataBase;
    private List<Point> points;
    private Point currPoint;


    @PostConstruct
    private void initialize() {
        currPoint = new Point();
        updateLocal();
    }

    private void updateLocal() {
        points = dataBase.getAll();
    }

    public void addResult() {
        Point copyPoint = new Point(currPoint);
        dataBase.save(copyPoint);
        updateLocal();
    }

}
