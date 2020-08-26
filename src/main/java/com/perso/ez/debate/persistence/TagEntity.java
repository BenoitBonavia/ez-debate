package com.perso.ez.debate.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.search.annotations.Field;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "tag")
public class TagEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Field
    @Column(name = "tag")
    private String tag;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private TagTypeEntity type;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<DataEntity> datas;

    @Field
    @Column(name = "favorite")
    private boolean favorite = false;

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public TagTypeEntity getType() {
        return type;
    }

    public void setType(TagTypeEntity type) {
        this.type = type;
    }

    public Set<DataEntity> getDatas() {
        return datas;
    }

    public void setDatas(Set<DataEntity> datas) {
        this.datas = datas;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}
