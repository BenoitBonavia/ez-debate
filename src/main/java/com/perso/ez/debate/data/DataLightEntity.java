package com.perso.ez.debate.data;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.perso.ez.debate.tag.TagEntity;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Indexed
@Table(name = "data")
public class DataLightEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Field
    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Field
    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @IndexedEmbedded
    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "data_tags", joinColumns = @JoinColumn(name = "data_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "tag"))
    private List<TagEntity> tags;

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

    public List<TagEntity> getTags() {
        return tags;
    }

    public void setTags(List<TagEntity> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "DataLightEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", text='" + text + '\'' +
                ", tags=" + tags +
                ", icon='" + icon + '\'' +
                ", date=" + date +
                '}';
    }
}
