package com.perso.ez.debate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dataTitle;

    public Long getId() {
        return id;
    }

    public String getDataTitle() {
        return dataTitle;
    }
}
