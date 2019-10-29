package com.perso.ez.debate.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/all")
    public Iterable<TagEntity> getAll() {
        return tagRepository.findAll();
    }

    @PostMapping
    public @ResponseBody
    TagEntity saveTag(@RequestBody TagEntity tag) {
        return tagRepository.save(tag);
    }
}
