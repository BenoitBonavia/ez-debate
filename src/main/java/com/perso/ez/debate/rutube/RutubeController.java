package com.perso.ez.debate.rutube;

import com.perso.ez.debate.rutube.models.RutubeTokenModel;
import com.perso.ez.debate.rutube.models.RutubeUploadVideoModel;
import com.perso.ez.debate.rutube.models.RutubeUploadedVideoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rutube")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RutubeController {

    @Autowired
    private RutubeService rutubeService;

    @PostMapping(value = "/upload/video")
    @ResponseBody
    RutubeUploadedVideoModel uploadVideoToRutube(@RequestBody String url) {
        RutubeTokenModel token = rutubeService.fetchRutubeAuthToken();
        RutubeUploadVideoModel video = new RutubeUploadVideoModel(url, "Titre de la video", "Description de la vidéo");
        return rutubeService.uploadVideo(video, token);
    }
}
