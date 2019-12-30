package com.perso.ez.debate.auth.register;

import antlr.Token;
import com.perso.ez.debate.auth.UserEntity;
import com.perso.ez.debate.auth.UserRepository;
import com.perso.ez.debate.auth.UserService;
import com.perso.ez.debate.auth.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Calendar;
import java.util.UUID;

enum StatusCode {
    TOKEN_ACTIVATED,
    TOKEN_EXPIRED,
    TOKEN_ALREADY_ACTIVATED,
    TOKEN_DOES_NOT_EXIST
}

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService service;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Value("${redirectUrl}")
    private String redirectUrl;

    @PostMapping
    public void createAccount(@RequestBody SignUpForm signUpForm, BindingResult result, WebRequest request) {
        UserEntity registered = new UserEntity();
        if (!result.hasErrors()) {
            registered = createUserAccount(signUpForm);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        try {
//            String appUrl = request.getContextPath(); TODO
            String appUrl = redirectUrl;
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), appUrl));
        } catch (Exception me) {
            me.printStackTrace();
        }
    }

    private UserEntity createUserAccount(SignUpForm signUpForm) {
        UserEntity registered;
        try {
            registered = service.registerNewUserAccount(signUpForm);
        } catch (IllegalArgumentException e) {
            return null;
        }
        return registered;
    }

    @CrossOrigin(origins = "localhost:4200", maxAge = 3600)
    @GetMapping(value = "/registrationConfirm/{token}")
    public StatusCode confirmRegistration(@PathVariable("token") String token) {
        VerificationToken verificationToken = service.getVerificationToken(token);
        if (verificationToken == null) {
            return StatusCode.TOKEN_DOES_NOT_EXIST;
        }
        if (verificationToken.getUser().isEnabled()) {
            return StatusCode.TOKEN_ALREADY_ACTIVATED;
        }

        UserEntity user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
//            return "redirect:http://" + redirectUrl;
            return StatusCode.TOKEN_EXPIRED;
        }

        user.setEnabled(true);
        userRepository.save(user);
        return StatusCode.TOKEN_ACTIVATED;
    }
}
