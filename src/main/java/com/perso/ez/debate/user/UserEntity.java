package com.perso.ez.debate.user;

import com.perso.ez.debate.tag.TagEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "user_account")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "valid")
    private Boolean valid;

    @Column(name = "ban")
    private Boolean ban;

    @Column(name = "role")
    private String role;

    @ManyToMany
    @JoinTable(name = "pref_home", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<TagEntity> prefHome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Boolean getBan() {
        return ban;
    }

    public void setBan(Boolean ban) {
        this.ban = ban;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<TagEntity> getPrefHome() {
        return prefHome;
    }

    public void setPrefHome(List<TagEntity> pref_home) {
        this.prefHome = pref_home;
    }
}
