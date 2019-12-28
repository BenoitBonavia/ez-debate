package com.perso.ez.debate.auth;

import org.springframework.data.repository.CrudRepository;

public interface VerificationTokenRepository extends CrudRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);
    VerificationToken findByUser(UserEntity user);
}
