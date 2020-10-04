package com.perso.ez.debate.rutube.models;

import org.springframework.util.LinkedMultiValueMap;

public class RutubeCredentialsModel {

    private String username;
    private String password;

    public RutubeCredentialsModel(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LinkedMultiValueMap<String, String> getAsLinkedMultiValueMap() {
        LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("username", this.username);
        map.add("password", this.password);
        return map;
    }
}
