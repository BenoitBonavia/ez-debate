package com.perso.ez.debate.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/{id}")
    public Optional<DataEntity> getOneById(@PathVariable Long id) {
        return dataRepository.findById(id);
    }

    @PostMapping()
    public @ResponseBody
    DataEntity saveData(@RequestBody DataEntity data) {
        return dataRepository.save(data);
    }
}
