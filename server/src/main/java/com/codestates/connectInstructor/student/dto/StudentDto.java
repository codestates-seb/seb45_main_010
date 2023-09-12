package com.codestates.connectInstructor.student.dto;

import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.student.entity.StudentSubject;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

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
    }

    @Getter
    @Builder
    public static class EmailCheck {
        private boolean isUsed;
    }

    @Getter
    @Builder
    public static class PatchIntroduction {
        @NotNull
        private long id;
        @NotBlank
        private String introduction;
    }

    @Getter
    @Builder
    public static class PatchLessonOption {
        @NotNull
        private long id;
        @NotBlank
        private String lessonOption;
    }

    @Getter
    @Builder
    public static class PatchName {
        @NotNull
        private long id;
        @NotNull
        private String name;
    }

    @Getter
    @Builder
    public static class PatchPassword {
        @NotNull
        private long id;
        @NotBlank
        private String password;
    }

    @Getter
    @Builder
    public static class PatchPhoneNumber {
        @NotNull
        private long id;
        @NotNull
        private String phoneNumber;
    }

    @Getter
    @Builder
    public static class PatchSubject {
        @NotNull
        private long studentId;
        @NotNull
        private List<String> subjects;
    }

    @Getter
    @Builder
    public static class PatchRegion {
        @NotNull
        private long studentId;
        @NotNull
        private List<String> regions;
    }


    @Getter
    @Builder
    public static class SimpleResponse {
        private long id;
        private String email;
        private String name;
        private String profileImg;
        private String phoneNumber;
        private boolean isOauth;
        private MemberStatus status;
    }

    @Getter
    @Builder
    public static class DetailResponse {
        private long id;
        private String name;
        private String email;
        private String profileImg;
        private String introduction;
        private String lessonOption;
        private String phoneNumber;
        private boolean isOauth;
        private MemberStatus status;
        private List<String> subjects;
        private List<String> regions;
        private List<MatchResponse> matches;
    }

    @Getter
    @Builder
    public static class MatchResponse {
        private long matchId;
        private String teacherName;
        private String schedule;
        private List<String> subjects;
        private Match.MatchStatus status;
    }

}
