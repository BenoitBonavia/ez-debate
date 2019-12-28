package com.perso.ez.debate.auth;

public interface IUserService {
    RegisterUserEntity registerNewUserAccount(RegisterDTO accountDto) throws IllegalArgumentException;
    void createVerificationToken(RegisterUserEntity user, String token);
    VerificationToken getVerificationToken(String VerificationToken);
    RegisterUserEntity getUser(String verificationToken);
}
