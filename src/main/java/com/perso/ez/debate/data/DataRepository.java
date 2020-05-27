package com.perso.ez.debate.data;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DataRepository extends CrudRepository<DataEntity, Long> {
    List<DataEntity> findAllByTags_TagContainingOrderByDateDesc(String tag);
}
