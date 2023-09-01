package com.codestates.connectInstructor.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupEvent {
    private String email;
    private String name;
}
