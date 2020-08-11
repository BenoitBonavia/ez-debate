package com.perso.ez.debate.auth;

import com.perso.ez.debate.data.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationUserRepository authenticationUserRepository;

    @GetMapping
    @ResponseBody
    public AuthenticationUserEntity getUser(Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        return authenticationUserRepository.findByEmailIgnoreCase(authentication.getName());
    }
}
