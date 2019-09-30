package com.perso.ez.debate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("api/data")
public class DataController {

    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/{id}")
    public Optional<DataEntity> getOneById(@PathVariable Long id) {
        return dataRepository.findById(id);
    }
}
