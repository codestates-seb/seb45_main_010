package com.codestates.connectInstructor.teacher.dto;

import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.subject.dto.SubjectDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class TeacherDto {
    @Getter@Setter
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
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Patch {
        private long id;
        private String name;
        private String phone;
        private String profileImg;
        private String introduction;
        private String career;
        private String lectureFee;
        private String option;
        private boolean onLine;
        private boolean offLine;
        private String address;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Response {
        private long id;
        private String email;
        private String name;
        private String phone;
        private String profileImg;
        private String introduction;
        private String career;
        private String lectureFee;
        private String option;
        private boolean onLine;
        private boolean offLine;
        private String address;
        private boolean oauth;
        private List<SubjectDto.Response> subjects;
        private List<RegionDto.Response> regions;
        private LocalDateTime lastLogin;
        private LocalDateTime lastModified;
        private LocalDateTime createdAt;


    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Element {
        private long id;
        private boolean onLine;
        private boolean offLine;
        private List<SubjectDto.Response> subjects;
        private List<RegionDto.Response> regions;
        private String name;
        private String profileImg;
        private LocalDateTime createdAt;
    }
}
