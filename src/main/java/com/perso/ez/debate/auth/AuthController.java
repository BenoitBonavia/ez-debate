package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/api/register")
public class AuthController {

    @Autowired
    RegisterUserRepository registerUserRepository;

    @Autowired
    UserService service;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @PostMapping
    public void createAccount(@RequestBody RegisterDTO registerDTO, BindingResult result, WebRequest request, Errors erros) {
        RegisterUserEntity registered = new RegisterUserEntity();
        if (!result.hasErrors()) {
            registered = createUserAccount(registerDTO, result);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), appUrl));
            System.err.println("CA PUBLIE");
        } catch (Exception me) {
            me.printStackTrace();
            System.err.println("ERREUR");
        }
    }

    private RegisterUserEntity createUserAccount(RegisterDTO registerDTO, BindingResult result) {
        RegisterUserEntity registered = null;
        try {
            registered = service.registerNewUserAccount(registerDTO);
        } catch (IllegalArgumentException e) {
            return null;
        }
        return registered;
    }
}
