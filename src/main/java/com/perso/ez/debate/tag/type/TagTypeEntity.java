package com.perso.ez.debate.tag.type;

import javax.persistence.*;

@Entity
@Table(name = "tag_type")
public class TagTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "type")
    private String type;

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
