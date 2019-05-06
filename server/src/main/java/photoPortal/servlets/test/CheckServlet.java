package photoPortal.servlets.test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import photoPortal.dto.Answer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/check")
public class CheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
        String answer = jsonBuilder.toJson(new Answer("Moment", true));
        response.getOutputStream().println(answer);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }
}


