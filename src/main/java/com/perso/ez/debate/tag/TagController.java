package com.perso.ez.debate.tag;

import com.perso.ez.debate.tag.type.TagTypeEntity;
import com.perso.ez.debate.tag.type.TagTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @ResponseBody
    @GetMapping("/{id}/favorite")
    public TagEntity switchFavorite(@PathVariable("id") Long id) {
        Optional<TagEntity> optionalTagEntity = tagRepository.findById(id);
        if (optionalTagEntity.isPresent()) {
            TagEntity tag = optionalTagEntity.get();
            tag.setFavorite(!tag.isFavorite());
            return tagRepository.save(tag);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public @ResponseBody void delete(@PathVariable(name = "id") Long dataId) {
        tagRepository.deleteById(dataId);
    }

    @GetMapping("/all/type/{id}")
    public Iterable<TagEntity> getAllByType(@PathVariable("id") Long id) {
        return tagRepository.findAllByTypeIdOrderByFavoriteDesc(id);
    }
}
