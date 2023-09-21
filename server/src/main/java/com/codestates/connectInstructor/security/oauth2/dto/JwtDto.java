package com.codestates.connectInstructor.security.oauth2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {
    String accessToken;
    String refreshToken;
}
