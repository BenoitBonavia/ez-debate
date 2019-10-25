package com.perso.ez.debate.tag;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.perso.ez.debate.data.DataLightEntity;
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

}
