package com.perso.ez.debate.security;

import com.perso.ez.debate.persistence.UserEntity;
import com.perso.ez.debate.persistence.repositories.UserRepository;
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
    private UserRepository userRepository;

    @GetMapping
    @ResponseBody
    public UserEntity getUser(Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        return userRepository.findByEmailIgnoreCase(authentication.getName());
    }

    @PostMapping("/register")
    @ResponseBody
    UserEntity registerNewUser(@RequestBody UserEntity userEntity) {
        System.out.println(userEntity);
        UserEntity newUser = new UserEntity();
        newUser.setFirstName(userEntity.getFirstName());
        newUser.setLastName(userEntity.getLastName());
        newUser.setEmail(userEntity.getEmail());
        newUser.setBan(false);
        newUser.setValid(true);
        newUser.setRole("ROLE_MEMBER");
        newUser.setPassword(new BCryptPasswordEncoder().encode(userEntity.getPassword()));
        return userRepository.save(newUser);
    }
}
