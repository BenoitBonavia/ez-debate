package com.perso.ez.debate.persistence;

import javax.persistence.*;

@Entity
@Table(name = "icon")
public class IconEntity {

    @Id
    @Column(name = "icon")
    private String icon;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
