package com.perso.ez.debate.persistence.repositories;

import com.perso.ez.debate.persistence.DataEntity;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DataRepository extends CrudRepository<DataEntity, Long> {
    List<DataEntity> findAllByTags_TagContainingOrderByDateDesc(String tag, Pageable pageable);
}
