package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Transactional
    public UserEntity registerNewUserAccount(RegisterDTO accountDTO) {
        if (emailExist(accountDTO.getEmail())) {
            throw new IllegalArgumentException("There is an account with that email address : " + accountDTO.getEmail());
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(accountDTO.getEmail());
        userEntity.setPasswordHash(new BCryptPasswordEncoder().encode(accountDTO.getPassword()));
        userEntity.setFirstname(accountDTO.getFirstname());
        userEntity.setLastname(accountDTO.getLastname());
        return repository.save(userEntity);
    }

    public void createVerificationToken(UserEntity user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

    public VerificationToken getVerificationToken(String verificationToken) {
        return tokenRepository.findByToken(verificationToken);
    }

    public UserEntity getUser(String verificationToken) {
        return tokenRepository.findByToken(verificationToken).getUser();
    }

    private boolean emailExist(String email) {
        UserEntity user = repository.findByEmail(email);
        return user != null;
    }
}
