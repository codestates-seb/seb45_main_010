package com.codestates.connectInstructor.teacher.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class TeacherDto {
    public static class Post {
        @Pattern(regexp = "^(?=.{1,30}$)((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$")
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String name;
        @NotBlank
        private String introduction;
        @NotBlank
        private String career;
        @NotBlank
        private String address;
    }
}
