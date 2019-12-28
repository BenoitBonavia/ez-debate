package com.perso.ez.debate.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService implements IUserService {

    @Autowired
    private RegisterUserRepository repository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Transactional
    @Override
    public RegisterUserEntity registerNewUserAccount(RegisterDTO accountDTO) {
        if (emailExist(accountDTO.getEmail())) {
            throw new IllegalArgumentException("There is an account with that email address : " + accountDTO.getEmail());
        }
        RegisterUserEntity userEntity = new RegisterUserEntity();
        userEntity.setEmail(accountDTO.getEmail());
        userEntity.setPasswordHash(new BCryptPasswordEncoder().encode(accountDTO.getPassword()));
        userEntity.setFirstname(accountDTO.getFirstname());
        userEntity.setLastname(accountDTO.getLastname());
        return repository.save(userEntity);
    }

    @Override
    public void createVerificationToken(RegisterUserEntity user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

    @Override
    public VerificationToken getVerificationToken(String verificationToken) {
        return tokenRepository.findByToken(verificationToken);
    }

    @Override
    public RegisterUserEntity getUser(String verificationToken) {
        return tokenRepository.findByToken(verificationToken).getUser();
    }

    private boolean emailExist(String email) {
        RegisterUserEntity user = repository.findByEmail(email);
        return user != null;
    }
}
