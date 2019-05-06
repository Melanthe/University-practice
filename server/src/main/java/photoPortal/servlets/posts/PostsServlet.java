package photoPortal.servlets.posts;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import photoPortal.classes.Test;
import photoPortal.classes.filter.Filter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

@WebServlet("/posts")
public class PostsServlet extends HttpServlet {

    //Filter in format: fauhtor and fhashtags ("hashtag1;hashtag2;hashtag3")

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

        try {
            Filter filter = new Filter();
            int skip = 0, top = 15;
            List<String> hashtags = new ArrayList<>();
            String fauthor = "", fhashtags = "";

            Enumeration<String> names = request.getParameterNames();
            String name, parameter;

            while (names.hasMoreElements()) {

                name = names.nextElement();
                parameter = request.getParameter(name);

                switch (name) {
                    case "skip": {
                        skip = Integer.parseInt(parameter.trim());
                        break;
                    }
                    case "top": {
                        top = Integer.parseInt(parameter.trim());
                        break;
                    }
                    case "fauthor": {
                        fauthor = parameter.trim();
                        filter.setAuthor(fauthor);
                        break;
                    }
                    case "fhashtags": {
                        fhashtags = parameter.trim();
                    }
                    default:
                        break;
                }
            }

            if (!fhashtags.equals("")) {
                filter.setHashtags(Arrays.asList(fhashtags.split(";")));
            }
            synchronized (Test.posts) {
                Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
                String answer = jsonBuilder.toJson(Test.posts.getPhotoPosts(skip, top, filter));
                response.getOutputStream().println(answer);
            }

        } catch (NumberFormatException error) {
            System.out.println("Incorrect parameters!");
        } catch (IOException error) {
            System.out.println("Input/Output error!");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        doGet(request, response);
    }
}
