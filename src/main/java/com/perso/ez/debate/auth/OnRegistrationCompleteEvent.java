package com.perso.ez.debate.auth;

import org.springframework.context.ApplicationEvent;

import java.util.Locale;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private Locale locale;
    private RegisterUserEntity user;

    public OnRegistrationCompleteEvent(RegisterUserEntity user, Locale locale, String appUrl) {
        super(user);
        this.user = user;
        this.locale = locale;
        this.appUrl = appUrl;
    }

    public Locale getLocale() {
        return locale;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public RegisterUserEntity getUser() {
        return user;
    }

    public void setUser(RegisterUserEntity user) {
        this.user = user;
    }
}
