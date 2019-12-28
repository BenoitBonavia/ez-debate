package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Calendar;

@RestController
@RequestMapping("/api/register")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService service;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @PostMapping
    public void createAccount(@RequestBody RegisterDTO registerDTO, BindingResult result, WebRequest request, Errors erros) {
        UserEntity registered = new UserEntity();
        if (!result.hasErrors()) {
            registered = createUserAccount(registerDTO);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), appUrl));
        } catch (Exception me) {
            me.printStackTrace();
        }
    }

    private UserEntity createUserAccount(RegisterDTO registerDTO) {
        UserEntity registered;
        try {
            registered = service.registerNewUserAccount(registerDTO);
        } catch (IllegalArgumentException e) {
            return null;
        }
        return registered;
    }

    @GetMapping(value = "/registrationConfirm")
    public String confirmRegistration(@RequestParam("token") String token) {
        VerificationToken verificationToken = service.getVerificationToken(token);
        if (verificationToken == null) {
            return "Wrong";
        }

        UserEntity user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
            return "Expired";
        }

        user.setEnabled(true);
        userRepository.save(user);
        return "Success";
    }
}
