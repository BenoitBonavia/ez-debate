package com.perso.ez.debate.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagLightRepository tagLightRepository;

    @GetMapping("/all")
    public Iterable<TagLightEntity> getAll() {
        return tagLightRepository.findAll();
    }

    @PostMapping
    public @ResponseBody
    TagLightEntity saveTag(@RequestBody TagLightEntity tag) {
        return tagLightRepository.save(tag);
    }
}
