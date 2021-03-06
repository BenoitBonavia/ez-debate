package com.perso.ez.debate.data;

import com.perso.ez.debate.persistence.DataEntity;
import com.perso.ez.debate.persistence.repositories.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/light/all")
    public Iterable<DataEntity> getAll() {
        return dataRepository.findAll();
    }

    @GetMapping("/light")
    public Iterable<DataEntity> getByTag(@RequestParam String tag, @RequestParam int pageNumber) {
        Pageable page = PageRequest.of(pageNumber, 10);
        return dataRepository.findAllByTags_TagContainingOrderByDateDesc(tag, page);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping()
    public @ResponseBody
    DataEntity saveData(@RequestBody DataEntity data) {
        data.getSources().forEach(sourceEntity -> {
            if (sourceEntity.getmTitle().isEmpty() && sourceEntity.getmDescription().isEmpty() && sourceEntity.getmImage().isEmpty()) {
                String link = "http://api.linkpreview.net/?key=5da039a275619ab6fe89d793b5a3c4153692779cb0680&q=" + sourceEntity.getLink();
                RestTemplate restTemplate = new RestTemplate();
                LinkPreview linkPreview = restTemplate.getForObject(link, LinkPreview.class);
                if (linkPreview != null) {
                    sourceEntity.setmDescription(linkPreview.getDescription());
                    sourceEntity.setmImage(linkPreview.getImage());
                    sourceEntity.setmTitle(linkPreview.getTitle());
                }
            }
        });
        return dataRepository.save(data);
    }

    @GetMapping("/detail/{id}")
    public Optional<DataEntity> getDetail(@PathVariable Long id) {
        return dataRepository.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public @ResponseBody void delete(@PathVariable(name = "id") Long dataId) {
        dataRepository.deleteById(dataId);
    }
}
