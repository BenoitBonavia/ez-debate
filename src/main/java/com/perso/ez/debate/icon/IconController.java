package com.perso.ez.debate.icon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/icon")
public class IconController {

    @Autowired
    private IconRepository iconRepository;

    @GetMapping("/all")
    public Iterable<IconEntity> getAll() {
        return iconRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public @ResponseBody
    IconEntity saveIcon(@RequestBody IconEntity icon) {
        if (icon.getIcon().equals("")) {
            return null;
        }
        return iconRepository.save(icon);
    }
}
