package com.perso.ez.debate.persistence.repositories;

import com.perso.ez.debate.persistence.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

    UserEntity findByEmailIgnoreCase(String email);

}
