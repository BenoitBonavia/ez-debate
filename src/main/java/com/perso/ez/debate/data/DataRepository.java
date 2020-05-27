package com.perso.ez.debate.data;

import org.springframework.data.repository.CrudRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DataRepository extends CrudRepository<DataEntity, Long> {
    List<DataEntity> findAllByTags_TagContainingOrderByDateDesc(String tag, Pageable pageable);
}
