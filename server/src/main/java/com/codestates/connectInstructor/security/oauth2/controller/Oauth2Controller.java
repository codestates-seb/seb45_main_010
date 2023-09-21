package com.codestates.connectInstructor.security.oauth2.controller;

import com.codestates.connectInstructor.security.oauth2.dto.JwtDto;
import com.codestates.connectInstructor.security.oauth2.dto.KakaoDto;
import com.codestates.connectInstructor.security.oauth2.service.Oauth2Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class Oauth2Controller {

    private final Oauth2Service service;

    @SneakyThrows
    @PostMapping("/login")
    public ResponseEntity oauth2Login(@RequestBody KakaoDto.Login request) {
        JwtDto response = service.loginWithCode(request.getCode());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + response.getAccessToken());
        headers.add("Refresh", response.getRefreshToken());

        return ResponseEntity.ok().headers(headers).build();
    }

    @SneakyThrows
    @PostMapping("/signup")
    public ResponseEntity oauth2Signup(@RequestBody KakaoDto.Signup request) {
        JwtDto response = service.signup(request.getCode(), request.getType());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + response.getAccessToken());
        headers.add("Refresh", response.getRefreshToken());

        return ResponseEntity.ok().headers(headers).build();
    }
}
