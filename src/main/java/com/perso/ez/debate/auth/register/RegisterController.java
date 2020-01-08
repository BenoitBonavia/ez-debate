package com.perso.ez.debate.auth.register;

import antlr.Token;
import com.perso.ez.debate.auth.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    VerificationTokenRepository tokenRepository;

    @Autowired
    UserService service;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Value("${redirectUrl}")
    private String redirectUrl;

    @Autowired
    private JavaMailSender emailSender;

    private static final int EXPIRATION = 60 * 24;

    @PostMapping
    public VerificationToken createAccount(@RequestBody SignUpForm signUpForm, BindingResult result, WebRequest request) {
        UserEntity registered = new UserEntity();
        VerificationToken verificationToken = new VerificationToken();
        if (!result.hasErrors()) {
            registered = createUserAccount(signUpForm);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        try {
//            String appUrl = request.getContextPath(); TODO

            UserEntity user = registered;
            String token = UUID.randomUUID().toString();
            verificationToken = service.createVerificationToken(user, token);

            sendVerificationMail(user, redirectUrl, token);
        } catch (Exception me) {
            me.printStackTrace();
        }
        return verificationToken;
    }

    @PostMapping("/refreshToken")
    public VerificationToken refreshToken(@RequestBody String token) {
        VerificationToken newToken = service.getVerificationToken(token);
        if (newToken == null) {
            return null;
        }
        newToken.setToken(UUID.randomUUID().toString());
        newToken.setExpiryDate(VerificationToken.calculateExpiryDate(EXPIRATION));
        newToken = tokenRepository.save(newToken);
        sendVerificationMail(newToken.getUser(), redirectUrl, token);
        return newToken;
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

    private void sendVerificationMail(UserEntity user, String appUrl, String token) {
        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl = appUrl + "/registrationConfirmation/" + token;
        String message = "Hi, thanks to confirm your mailbox by clicking on the following link !";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\n"  + confirmationUrl);
        emailSender.send(email);
    }
}
