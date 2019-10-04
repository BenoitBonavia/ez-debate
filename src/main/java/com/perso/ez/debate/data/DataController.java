package com.perso.ez.debate.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataRepository dataRepository;

    @Autowired
    private DataLightRepository dataLightRepository;

    @GetMapping("/light/all")
    public Iterable<DataLightEntity> getAll() {
        return dataLightRepository.findAll();
    }

    @PostMapping()
    public @ResponseBody
    DataEntity saveData(@RequestBody DataEntity data) {
        return dataRepository.save(data);
    }
}
