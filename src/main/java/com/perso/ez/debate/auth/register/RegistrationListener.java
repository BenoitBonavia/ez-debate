package com.perso.ez.debate.auth.register;

import com.perso.ez.debate.auth.UserEntity;
import com.perso.ez.debate.auth.UserService;
import com.perso.ez.debate.auth.register.OnRegistrationCompleteEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    @Autowired
    private UserService service;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    public void confirmRegistration(OnRegistrationCompleteEvent event) {

//        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        UserEntity user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
//        String confirmationUrl = event.getAppUrl() + "/api/register/registrationConfirm?token=" + token;
        String confirmationUrl = event.getAppUrl() + "/registrationConfirmation/" + token;
        String message = "Bonjour merci de confirmer votre adresse email";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "rn "  + confirmationUrl);
        emailSender.send(email);
    }
}
