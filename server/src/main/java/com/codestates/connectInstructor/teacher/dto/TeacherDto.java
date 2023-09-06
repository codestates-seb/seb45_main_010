package com.codestates.connectInstructor.teacher.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class TeacherDto {
    @Getter
    @Builder
    public static class Post {
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
//        @NotBlank
//        private String career;
//        @NotBlank
//        private String address;
    }
}
