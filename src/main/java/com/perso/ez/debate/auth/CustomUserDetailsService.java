package com.perso.ez.debate.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final AuthenticationUserRepository authenticationUserRepository;

    @Autowired
    public CustomUserDetailsService(AuthenticationUserRepository authenticationUserRepository) {
        this.authenticationUserRepository = authenticationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        AuthenticationUserEntity registeredUser = authenticationUserRepository.findByEmailIgnoreCase(email);
        if (registeredUser == null) {
            logger.warn("Unknown user in DB for {}", email);
            return null;
        } else {
            logger.info("Known user in DB for {}", email);
            return new User(
                    registeredUser.getEmail(),
                    registeredUser.getPassword(),
                    registeredUser.getValid(),
                    registeredUser.getEndValidity() == null || registeredUser.getEndValidity().isAfter(LocalDateTime.now()),
                    true,
                    !registeredUser.getBan(),
                    AuthorityUtils.createAuthorityList(registeredUser.getRole() != null ? registeredUser.getRole() : "ROLE_NONE"));
        }
    }
}
