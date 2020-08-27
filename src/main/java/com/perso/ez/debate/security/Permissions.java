package com.perso.ez.debate.security;

import com.perso.ez.debate.persistence.UserEntity;
import com.perso.ez.debate.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("permissions")
public class Permissions {

    @Autowired
    private UserRepository userRepository;

    public boolean isCurrentUser(Authentication authentication, Long id) {
        User principal = (User)authentication.getPrincipal();
        Optional<UserEntity> paramUser = userRepository.findById(id);
        UserEntity principalUser = userRepository.findByEmailIgnoreCase(principal.getUsername());
        return paramUser.isPresent() && paramUser.get().getId().equals(principalUser.getId());
    }
}
