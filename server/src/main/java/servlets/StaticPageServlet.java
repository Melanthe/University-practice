package servlets;

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

            String name = request.getParameter("name");

            if (name.length() > 100) {
                response.getOutputStream().println("Too long name!");
            } else {
                response.getOutputStream().println("Name is " + name);
            }

        } catch (IOException e) {
            System.out.println("Input/output error!");
        }
    }
}