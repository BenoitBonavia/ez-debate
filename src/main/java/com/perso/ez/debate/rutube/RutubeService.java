package com.perso.ez.debate.rutube;

import com.perso.ez.debate.rutube.models.RutubeCredentialsModel;
import com.perso.ez.debate.rutube.models.RutubeTokenModel;
import com.perso.ez.debate.rutube.models.RutubeUploadVideoModel;
import com.perso.ez.debate.rutube.models.RutubeUploadedVideoModel;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class RutubeService {

    private final String BASE_URL = "https://rutube.ru/api";

    private final WebClient webClient = WebClient.create(BASE_URL);
    private final RutubeCredentialsModel credentials;

    public RutubeService(@Value("${rutube.username}") String username, @Value("${rutube.password}") String password) {
        credentials = new RutubeCredentialsModel(username, password);
    }

    public RutubeTokenModel fetchRutubeAuthToken(){
        return webClient.post()
                .uri("/accounts/token_auth")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(BodyInserters.fromFormData(credentials.getAsLinkedMultiValueMap()))
                .retrieve()
                .bodyToMono(RutubeTokenModel.class)
                .block();
    }

    public RutubeUploadedVideoModel uploadVideo(RutubeUploadVideoModel video, RutubeTokenModel token) {
        return webClient.post()
                .uri("/video/")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("Authorization", "Token " + token.getToken())
                .body(BodyInserters.fromFormData(video.getAsLinkedMultiValueMap()))
                .retrieve()
                .bodyToMono(RutubeUploadedVideoModel.class)
                .doOnError(System.out::println)
                .block();
    }
}
