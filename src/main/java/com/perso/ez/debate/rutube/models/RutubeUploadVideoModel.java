package com.perso.ez.debate.rutube.models;

import org.springframework.util.LinkedMultiValueMap;

public class RutubeUploadVideoModel {

    private String url;
    private String title;
    private String description;
    private String isHidden;
    private String categoryId;

    public RutubeUploadVideoModel(String url, String title, String description) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.isHidden = "0";
        this.categoryId = "13";
    }

    public LinkedMultiValueMap<String, String> getAsLinkedMultiValueMap() {
        LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("url", this.url);
        map.add("title", this.title);
        map.add("description", this.description);
        map.add("is_hidden", this.isHidden);
        map.add("category_id", this.categoryId);
        return map;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(String isHidden) {
        this.isHidden = isHidden;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
