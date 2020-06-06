package com.perso.ez.debate.tag;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TagRepository extends CrudRepository<TagEntity, Long> {
    List<TagEntity> findAllByTypeIdOrderByFavoriteDesc(Long id);
}
