package servlets;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/page")
public class StaticPageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/page.html");
            dispatcher.forward(request,response);

        } catch (IOException e) {
            System.out.println("Input/output error!");
        } catch (ServletException e) {
            System.out.println("Servlet exception!");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}