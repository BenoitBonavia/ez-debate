package com.perso.ez.debate.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.lang.String.format;

@Component
public class RESTAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private static final Logger logger = LoggerFactory.getLogger(RESTAuthenticationFailureHandler.class);

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = exception.getMessage();
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        logger.info(format("Authentication failed because of '%s' : { 'username': '%s'; 'password': '%s'}", errorMessage, username, password));
        if (exception instanceof DisabledException) {
            response.setStatus(HttpStatus.PRECONDITION_FAILED.value());
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}
