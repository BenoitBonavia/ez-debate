package com.perso.ez.debate.tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.perso.ez.debate.data.DataEntity;
import com.perso.ez.debate.tag.type.TagTypeEntity;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import javax.xml.crypto.Data;
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
}
