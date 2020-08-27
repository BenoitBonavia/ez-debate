package com.perso.ez.debate.persistence;


import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Indexed
@Table(name = "data")
public class DataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Field
    @Column(name = "title")
    private String title;

    @Field
    @Column(name = "subtitle")
    private String subtitle;

    @Field
    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "data_tags", joinColumns = @JoinColumn(name = "data_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @IndexedEmbedded
    private Set<TagEntity> tags;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "data_id", referencedColumnName = "id")
    private Set<VideoEntity> videos;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "data_id", referencedColumnName = "id")
    private Set<SourceEntity> sources;

    @Column(name = "icon")
    private String icon;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

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

    public Set<TagEntity> getTags() {
        return tags;
    }

    public void setTags(Set<TagEntity> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "DataEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", text='" + text + '\'' +
                ", tags=" + tags +
                ", icon='" + icon + '\'' +
                ", date=" + date +
                '}';
    }

    public Set<VideoEntity> getVideos() {
        return videos;
    }

    public void setVideos(Set<VideoEntity> videos) {
        this.videos = videos;
    }

    public Set<SourceEntity> getSources() {
        return sources;
    }

    public void setSources(Set<SourceEntity> sources) {
        this.sources = sources;
    }
}
