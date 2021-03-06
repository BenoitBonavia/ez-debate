package com.perso.ez.debate.tag;

import com.perso.ez.debate.persistence.TagEntity;
import com.perso.ez.debate.persistence.repositories.TagRepository;
import com.perso.ez.debate.persistence.TagTypeEntity;
import com.perso.ez.debate.persistence.repositories.TagTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/favorite/all")
    public Iterable<TagEntity> getAllFavorite() {
        return tagRepository.findAllByFavoriteIsTrue();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public @ResponseBody
    TagEntity saveTag(@RequestBody TagEntity tag) {
        return tagRepository.save(tag);
    }

    @GetMapping("/type/all")
    public Iterable<TagTypeEntity> getAllTypes() {
        return tagTypeRepository.findAll();
    }

    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public @ResponseBody
    void delete(@PathVariable(name = "id") Long dataId) {
        tagRepository.deleteById(dataId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/type/{id}")
    public @ResponseBody
    void deleteType(@PathVariable(name = "id") Long typeId) {
        tagTypeRepository.deleteById(typeId);
    }

    @GetMapping("/all/type/{id}")
    public Iterable<TagEntity> getAllByType(@PathVariable("id") Long id) {
        return tagRepository.findAllByTypeIdOrderByFavoriteDesc(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/type")
    public @ResponseBody
    TagTypeEntity saveTagType(@RequestBody TagTypeEntity type) {
        return tagTypeRepository.save(type);
    }
}
