package com.codestates.connectInstructor.exception;

import lombok.Getter;

public enum ExceptionCode {
    NOT_AUTHORIZED(403, "NOT AUTHORIZED"),
    MEMBER_NOT_FOUND(404, "MEMBER NOT FOUND"),
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