package com.perso.ez.debate.auth;

import org.springframework.data.repository.CrudRepository;

public interface RegisterUserRepository extends CrudRepository<RegisterUserEntity, Long> {

    RegisterUserEntity findByEmail( String email);
}
