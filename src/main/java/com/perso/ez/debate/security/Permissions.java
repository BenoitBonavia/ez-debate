package com.perso.ez.debate.security;

import com.perso.ez.debate.user.UserEntity;
import com.perso.ez.debate.user.UserRepository;
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
        Optional<UserEntity> principalUser = userRepository.findByEmail(principal.getUsername());
        return paramUser.isPresent() && principalUser.isPresent() && paramUser.get().getId().equals(principalUser.get().getId());
    }
}
