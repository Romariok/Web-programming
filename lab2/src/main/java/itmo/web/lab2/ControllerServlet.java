package itmo.web.lab2;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Objects;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
/**
 * @author Romariok on 04.10.2023
 */
@WebServlet(name="Controller",value="/app")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("clear") != null && Objects.equals(req.getRequestDispatcher("clear"), "true"))  req.getRequestDispatcher("/clear").forward(req, resp);
        else if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null)
            req.getRequestDispatcher("/checker").forward(req, resp);
        else {
            req.setAttribute("message", "Ошибка: переданы не все параметры!");
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, resp);

    }
}
