package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/register")
    @ResponseBody
    AuthenticationUserEntity registerNewUser(@RequestBody AuthenticationUserEntity userEntity) {
        System.out.println(userEntity);
        AuthenticationUserEntity newUser = new AuthenticationUserEntity();
        newUser.setFirstName(userEntity.getFirstName());
        newUser.setLastName(userEntity.getLastName());
        newUser.setEmail(userEntity.getEmail());
        newUser.setBan(false);
        newUser.setValid(true);
        newUser.setRole("ROLE_MEMBER");
        newUser.setPassword(new BCryptPasswordEncoder().encode(userEntity.getPassword()));
        return authenticationUserRepository.save(newUser);
    }
}
