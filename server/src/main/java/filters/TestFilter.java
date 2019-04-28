package filters;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = {"/", "/status", "/get", "/check", "/page", "/test1", "/test2"})
public class TestFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest)request;
        String method = req.getMethod();
        String url = req.getRequestURL().toString();
        Long workTime = System.currentTimeMillis();

        chain.doFilter(request, response);
        workTime = System.currentTimeMillis() - workTime;
        System.out.println(method + " + " + url + " + " + workTime + "ms");
    }
}
