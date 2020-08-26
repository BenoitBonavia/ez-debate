package com.perso.ez.debate.user;

import com.perso.ez.debate.persistence.UserEntity;
import com.perso.ez.debate.persistence.TagEntity;
import com.perso.ez.debate.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Iterable<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserEntity saveUser(@RequestBody UserEntity user) {
        return userRepository.save(user);
    }

    @PostMapping("/pref/id={userId}")
    @ResponseBody
    @PreAuthorize("@permissions.isCurrentUser(authentication, #userId)")
    public UserEntity setPrefHome(@PathVariable Long userId, @RequestBody List<TagEntity> tags) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("This user doesn't exist");
        }
        UserEntity user = userOptional.get();
        user.setPrefHome(tags);
        return userRepository.save(user);
    }
}
