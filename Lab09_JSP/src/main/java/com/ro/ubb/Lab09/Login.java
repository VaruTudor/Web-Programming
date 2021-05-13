package com.ro.ubb.Lab09;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Login extends HttpServlet {

    private int validateCredentials(String username, String password){
        DatabaseConnector db = new DatabaseConnector();
        db.connect();
        int userId = db.getUserId(username, password);
        db.disconnect();
        return userId;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        int userId = validateCredentials(
                username,
                request.getParameter("password")
        );

        if(userId != 0){ // if we got here we have a correct login
            HttpSession httpSession = request.getSession();
            httpSession.setAttribute("userId",userId);
            httpSession.setAttribute("username",username);
            response.sendRedirect("puzzle.jsp");
        }else {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
