package com.perso.ez.debate.data;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DataLightRepository extends CrudRepository<DataLightEntity, Long> {

    List<DataLightEntity> findAllByTags_TagContaining(String tag);
}
