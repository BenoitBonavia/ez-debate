package com.perso.ez.debate.persistence.repositories;

import com.perso.ez.debate.persistence.TagEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TagRepository extends CrudRepository<TagEntity, Long> {
    List<TagEntity> findAllByTypeIdOrderByFavoriteDesc(Long id);
    List<TagEntity> findAllByFavoriteIsTrue();
}
