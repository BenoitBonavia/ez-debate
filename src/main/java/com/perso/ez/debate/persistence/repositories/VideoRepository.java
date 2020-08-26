package com.perso.ez.debate.persistence.repositories;

import com.perso.ez.debate.persistence.VideoEntity;
import org.springframework.data.repository.CrudRepository;

public interface VideoRepository extends CrudRepository<VideoEntity, Long> {
}
