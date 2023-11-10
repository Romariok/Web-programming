package itmo.web.lab2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.util.*;
import java.io.*;
/**
 * @author Romariok on 04.10.2023
 */
@WebServlet(name="Checker", value="/checker")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        long startTime = System.nanoTime();
        HttpSession session = req.getSession();
        resp.setContentType("text/html;charset=UTF-8");
        List tableRows = (List) session.getAttribute("tableRows");
        if (tableRows == null) {
            tableRows = new ArrayList<String>();
            session.setAttribute("tableRows", tableRows);
            tableRows.add("<table id='outputTable' class='main__table'><tr>" +
                    "<th>X</th>" +
                    "<th>Y</th>" +
                    "<th>R</th>" +
                    "<th>Запуск</th>" +
                    "<th>Работа</th>" +
                    "<th>Результат</th></tr>");

        }
        double x = Double.parseDouble(req.getParameter("x"));
        double y = Double.parseDouble(req.getParameter("y"));
        double r = Double.parseDouble(req.getParameter("r"));
        String key = req.getParameter("key");
        PrintWriter writer = resp.getWriter();
        try {
            if (checkData(x, y, r, key)) {
                long endTime = System.nanoTime();
                tableRows.add(new Point(x, y, r, endTime-startTime).toString());
                for (Object tableRow: tableRows) writer.println(tableRow);
            } else resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } finally {
            if (writer != null) writer.close();
        }
    }

    private boolean checkData(double x, double y, double r, String key){
//        Double[] xInterval = {-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0};
//        Double[] rInterval = {1.0, 2.0, 3.0, 4.0, 5.0};
        if (key.equals("button"))
            return ((x >=-4 && x<= 4) && (y >= -5 && y <=5) && (r>=1 && r<=5));
        else if (key.equals("svg")) return (r>=1 && r<=5);
        else return false;
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, res);
    }
}
