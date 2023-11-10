package itmo.web.lab3;

import lombok.Data;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Romariok on 22.10.2023
 */

@Data
public class TimeCharger implements Serializable {
    private static final long serialVersionUID = -2988885663031299002L;
    private String time;

    private String formatDate(Date date) {
        return new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(date);
    }

    public TimeCharger() {
        this.time = formatDate(new Date());
    }

    public void updateTime() {
        time = formatDate(new Date());
    }
}
