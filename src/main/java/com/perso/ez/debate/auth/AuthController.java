package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class AuthController {

    private RegisterUserRepository registerUserRepository;

    @Autowired
    public AuthController(RegisterUserRepository registerUserRepository) {
        this.registerUserRepository = registerUserRepository;
    }

    @PostMapping
    public void createAccount(@RequestBody RegisterDTO registerDTO) {
        if (emailExist(registerDTO.getEmail())) {
            return;
        }
        RegisterUserEntity userEntity = new RegisterUserEntity();
        userEntity.setEmail(registerDTO.getEmail());
        userEntity.setPasswordHash(new BCryptPasswordEncoder().encode(registerDTO.getPassword()));
        userEntity.setFirstname(registerDTO.getFirstname());
        userEntity.setLastname(registerDTO.getLastname());
        registerUserRepository.save(userEntity);
    }

    private boolean emailExist(String email) {
        RegisterUserEntity user = registerUserRepository.findByEmail(email);
        return user != null;
    }
}
