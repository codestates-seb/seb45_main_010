package com.codestates.connectInstructor.security.oauth2.dto;


import lombok.Getter;
import lombok.Setter;

public class KakaoDto {

    @Getter
    @Setter
    public static class Login {
        String code;
    }

    @Getter
    @Setter
    public static class Signup {
        String code;
        String type;
    }
}
