package com.perso.ez.debate.data;

import javax.persistence.*;

@Entity
@Table(name = "data")
public class DataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "data_title")
    private String dataTitle;

    public Long getId() {
        return id;
    }

    public String getDataTitle() {
        return dataTitle;
    }

    public void setDataTitle(String dataTitle) {
        this.dataTitle = dataTitle;
    }
}
