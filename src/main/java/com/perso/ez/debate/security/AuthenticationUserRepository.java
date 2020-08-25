package com.perso.ez.debate.security;

import org.springframework.data.repository.CrudRepository;

public interface AuthenticationUserRepository extends CrudRepository<AuthenticationUserEntity, Long> {

    AuthenticationUserEntity findByEmailIgnoreCase(String email);

}
