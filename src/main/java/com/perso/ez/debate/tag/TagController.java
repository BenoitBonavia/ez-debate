package com.perso.ez.debate.tag;

import com.perso.ez.debate.tag.type.TagTypeEntity;
import com.perso.ez.debate.tag.type.TagTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagTypeRepository tagTypeRepository;

    @GetMapping("/all")
    public Iterable<TagEntity> getAll() {
        return tagRepository.findAll();
    }

    @PostMapping
    public @ResponseBody
    TagEntity saveTag(@RequestBody TagEntity tag) {
        return tagRepository.save(tag);
    }

    @GetMapping("/type/all")
    public Iterable<TagTypeEntity> getAllTypes() { return tagTypeRepository.findAll(); }
}
