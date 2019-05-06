package photoPortal.servlets.test;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/test1")
public class Test1Servlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/status");
            dispatcher.forward(request, response);

        } catch (IOException e) {
            System.out.println("Input/output error!");
        } catch (ServletException e) {
            System.out.println("Servlet error!");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        doGet(request, response);
    }
}
