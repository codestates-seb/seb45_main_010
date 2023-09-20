package com.codestates.connectInstructor.subject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class SubjectDto {
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Post {
        @NotBlank
        private String subjectName;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Response {
        private long id;
        private String subjectName;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class ResponseList {
        private List<SubjectDto.Response> subjects;
    }
}
