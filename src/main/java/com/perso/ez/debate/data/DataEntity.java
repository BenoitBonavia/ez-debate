package com.perso.ez.debate.data;

import com.perso.ez.debate.data.source.SourceEntity;
import com.perso.ez.debate.tag.TagEntity;
import com.perso.ez.debate.data.video.VideoEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "data")
public class DataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @Column(name = "icon")
    private String icon;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

    @ManyToMany
    @JoinTable(name = "data_tags", joinColumns = @JoinColumn(name = "data_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private List<TagEntity> tags;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "data_id", referencedColumnName = "id")
    private List<VideoEntity> videos;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "data_id", referencedColumnName = "id")
    private List<SourceEntity> sources;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public List<SourceEntity> getSources() {
        return sources;
    }

    public void setSources(List<SourceEntity> sources) {
        this.sources = sources;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public List<VideoEntity> getVideos() {
        return videos;
    }

    public void setVideos(List<VideoEntity> videos) {
        this.videos = videos;
    }

    public List<TagEntity> getTags() {
        return tags;
    }

    public void setTags(List<TagEntity> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "DataEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", text='" + text + '\'' +
                ", icon='" + icon + '\'' +
                ", date=" + date +
                ", videos=" + videos +
                ", sources=" + sources +
                '}';
    }
}
