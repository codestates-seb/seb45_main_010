package com.codestates.connectInstructor.security.oauth2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/oauth2Test")
public class oauth2TestController {
    @GetMapping
    public String test() {
        return "done!";
    }

}
