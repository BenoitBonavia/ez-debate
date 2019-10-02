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

    @GetMapping("/all")
    public Iterable<DataEntity> getAll() {
        return dataRepository.findAll();
    }

    @PostMapping()
    public @ResponseBody
    DataEntity saveData(@RequestBody DataEntity data) {
        System.out.println(data.toString());
        return dataRepository.save(data);
    }
}
