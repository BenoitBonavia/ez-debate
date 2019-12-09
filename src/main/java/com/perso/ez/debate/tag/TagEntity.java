package com.perso.ez.debate.tag;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.perso.ez.debate.data.DataLightEntity;
import com.perso.ez.debate.tag.type.TagTypeEntity;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import java.io.Serializable;

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
}
