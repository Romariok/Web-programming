package itmo.web.lab3;

import itmo.web.lab3.database.DataBase;
import lombok.Data;

import javax.enterprise.inject.Model;
import javax.inject.Inject;
import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
    private List<Double> availableItems;
    private List<Double> selectedItems;


    @PostConstruct
    private void initialize() {
        availableItems = new ArrayList<>();
        for (double i = -4; i <= 4; i++) {
            availableItems.add(i);
        }
        currPoint = new Point();
        currPoint.setBornDate(new Date());
        updateLocal();
    }

    private void updateLocal() {
        points = dataBase.getAll();
    }

    public void addResult() {
        Point copyPoint = new Point(currPoint);
        dataBase.save(copyPoint);
        currPoint.setBornDate(new Date());
        updateLocal();
    }
    public void clearResults() {
        dataBase.clear();
        points = dataBase.getAll();
        updateLocal();
    }

    public void handleSelectionChange() {
        if (selectedItems != null && !selectedItems.isEmpty()) {
            System.out.println("Selected items: " + selectedItems);
            currPoint.setX(selectedItems.get(0));
        } else {
            System.out.println("No items selected");
        }
    }
}
