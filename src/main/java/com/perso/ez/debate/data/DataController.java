package com.perso.ez.debate.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


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

    @GetMapping("/light/tag/{tag}")
    public Iterable<DataLightEntity> getByTag(@PathVariable String tag) {
        return dataLightRepository.findAllByTags_TagContaining(tag);
    }

    @PostMapping()
    public @ResponseBody
    DataEntity saveData(@RequestBody DataEntity data) {
        data.getSources().forEach(sourceEntity -> {
            String link = "http://api.linkpreview.net/?key=5da039a275619ab6fe89d793b5a3c4153692779cb0680&q=" + sourceEntity.getLink();
            RestTemplate restTemplate = new RestTemplate();
            LinkPreview linkPreview = restTemplate.getForObject(link, LinkPreview.class);
            if (linkPreview != null) {
                sourceEntity.setmDescription(linkPreview.getDescription());
                sourceEntity.setmImage(linkPreview.getImage());
                sourceEntity.setmTitle(linkPreview.getTitle());
            }
        });
        return dataRepository.save(data);
    }

    @GetMapping("/detail/{id}")
    public Optional<DataEntity> getDetail(@PathVariable Long id) {
        return dataRepository.findById(id);
    }
}
