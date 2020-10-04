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
    RutubeUploadedVideoModel uploadVideoToRutube(@RequestBody RutubeUploadVideoModel uploadVideo) {
        System.out.println(uploadVideo.getTitle());
        RutubeTokenModel token = rutubeService.fetchRutubeAuthToken();
        RutubeUploadVideoModel video = new RutubeUploadVideoModel(uploadVideo.getUrl(), uploadVideo.getTitle(), uploadVideo.getTitle());
        return rutubeService.uploadVideo(video, token);
    }
}
