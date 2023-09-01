package com.codestates.connectInstructor.exception;

import lombok.Getter;

public enum ExceptionCode {
    NOT_AUTHORIZED(403, "NOT AUTHORIZED"),
    USED_EMAIL(409,  "USED EMAIL");

    @Getter
    private int code;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}