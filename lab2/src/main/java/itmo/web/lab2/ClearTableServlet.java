package itmo.web.lab2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.util.*;
import java.io.*;

/**
 * @author Romariok on 09.10.2023
 */
@WebServlet(name="Cleaner", value="/clear")
public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession();
        resp.setContentType("text/html;charset=UTF-8");
            List tableRowss = new ArrayList<String>();
            session.setAttribute("tableRows", tableRowss);
            session.setAttribute("tableRows", tableRowss);
            tableRowss.add("<table id='outputTable' class='main__table'><tr>" +
                    "<th>X</th>" +
                    "<th>Y</th>" +
                    "<th>R</th>" +
                    "<th>Запуск</th>" +
                    "<th>Работа</th>" +
                    "<th>Результат</th></tr>");


        PrintWriter writer = resp.getWriter();
        try {
            for (Object tableRow: tableRowss) writer.println(tableRow);
        } finally {
            if (writer != null) writer.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, res);
    }
}
