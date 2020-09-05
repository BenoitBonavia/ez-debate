package com.perso.ez.debate.persistence.repositories;

import com.perso.ez.debate.persistence.MediaEntity;
import org.springframework.data.repository.CrudRepository;

public interface VideoRepository extends CrudRepository<MediaEntity, Long> {
}
