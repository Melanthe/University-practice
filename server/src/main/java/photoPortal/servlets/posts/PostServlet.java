package photoPortal.servlets.posts;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import photoPortal.classes.Test;
import photoPortal.classes.posts.Post;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@WebServlet("/post")
public class PostServlet extends HttpServlet {

    //For getting photo-post by id

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

        try {

            if (request.getParameter("id") == null) {
                response.getOutputStream().print("Input an id!");
            }

            long id = Long.parseLong(request.getParameter("id").trim());

            synchronized (Test.posts) {

                if (Test.posts.ifExistID(id)) {
                    Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
                    String answer = jsonBuilder.toJson(Test.posts.getPost(id));
                    response.getOutputStream().println(answer);
                } else {
                    response.getOutputStream().println("There is not such post!");
                }
            }
        } catch (NumberFormatException error) {
            System.out.println("Incorrect id!");
        } catch (IOException error) {
            System.out.println("Output error!");
        }
    }

    private boolean addPhoto(HttpServletRequest request)
            throws NumberFormatException {

        int likes = 0;
        long id = -1;
        String author = "", description = "", photoPath = "";
        List<String> hashtags = new ArrayList<>(), liked = new ArrayList<>();

        Enumeration<String> names = request.getParameterNames();
        String name, parameter;

        while (names.hasMoreElements()) {

            name = names.nextElement();
            parameter = request.getParameter(name);

            switch (name) {
                case "id": {
                    id = Long.parseLong(parameter.trim());
                    break;
                }
                case "likes": {
                    likes = Integer.parseInt(parameter.trim());
                    break;
                }
                case "author": {
                    author = parameter.trim();
                    break;
                }
                case "description": {
                    description = parameter.trim();
                    break;
                }
                case "photoPath": {
                    photoPath = parameter.trim();
                    break;
                }
                case "hashtags": {
                    hashtags = Arrays.asList(parameter.trim().split(";"));
                    break;
                }
                case "liked": {
                    liked = Arrays.asList(parameter.trim().split(";"));
                }
                default: break;
            }
        }

        if (author.equals("") || photoPath.equals("")) {
            throw new NumberFormatException();
        }

        synchronized (Test.posts) {
            return Test.posts.addPhotoPost(
                    new Post(author, photoPath, description, hashtags, new Date(), liked, id, likes));
        }
    }

    private boolean editPhoto(HttpServletRequest request)
            throws NumberFormatException {

        long id = -1;
        String description = "", photoPath = "";
        List<String> hashtags = new ArrayList<>();

        Enumeration<String> names = request.getParameterNames();
        String name, parameter;

        while (names.hasMoreElements()) {

            name = names.nextElement();
            parameter = request.getParameter(name);

            switch (name) {
                case "id": {
                    id = Long.parseLong(parameter.trim());
                    break;
                }
                case "description": {
                    description = parameter.trim();
                    break;
                }
                case "photoPath": {
                    photoPath = parameter.trim();
                    break;
                }
                case "hashtags": {
                    hashtags = Arrays.asList(parameter.trim().split(";"));
                    break;
                }
                default: break;
            }
        }

        synchronized (Test.posts) {
            return Test.posts.editPhotoPost(id, description, photoPath, hashtags);
        }
    }


    //For addition and editing photo-post by id
    //Key action: "edit" or "add"
    //Hashtags in format: "first;second;third"

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

        try {

            request.setCharacterEncoding("UTF-8");
            String action = request.getParameter("action");

            if (action == null) {
                System.out.println("Request doesn't have parameter action!");
                return;
            }

            if (action.equals("add")) {

                if (addPhoto(request)) {
                    response.getOutputStream().println("Successful addition!");
                } else {
                    response.getOutputStream().println("Invalid post!");
                }

            } else if (action.equals("edit")) {

                if (editPhoto(request)) {
                    response.getOutputStream().println("Successful edition!");
                } else {
                    response.getOutputStream().println("Invalid post!");
                }

            } else {
                throw new IOException();
            }

        } catch (IOException error) {
            System.out.println("Input/Output error!");
        } catch (NumberFormatException error) {
            System.out.println("Incorrect parameters!");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        try {

            if (request.getParameter("id") == null) {
                response.getOutputStream().print("Input an id!");
            }

            long id = Long.parseLong(request.getParameter("id").trim());

            synchronized (Test.posts) {

                if (Test.posts.ifExistID(id)) {
                    Test.posts.removePhotoPost(id);
                    response.getOutputStream().println("Successful removing!");
                } else {
                    response.getOutputStream().println("There is not such post!");
                }
            }
        } catch (NumberFormatException error) {
            System.out.println("Incorrect id!");
        } catch (IOException error) {
            System.out.println("Output error!");
        }
    }
}
