package com.codestates.connectInstructor.email.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerifyEmailEvent {
    String email;
    String name;
}
