package com.codestates.connectInstructor.student.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class StudentDto {
    @Getter
    @Builder
    public static class Post {
        //Todo 인풋 필터링할 조건 프론트와 상의 후 추가
        @Pattern(regexp = "^(?=.{1,30}$)((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$")
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String name;
//        @NotBlank
//        private String profileImg;
//        @NotBlank
//        private String introduction;
    }
}
