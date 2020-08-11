package com.perso.ez.debate.auth;

import org.springframework.data.repository.CrudRepository;

public interface AuthenticationUserRepository extends CrudRepository<AuthenticationUserEntity, Long> {

    AuthenticationUserEntity findByEmailIgnoreCase(String email);

}
