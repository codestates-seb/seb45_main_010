package com.codestates.connectInstructor.teacher.dto;

import com.codestates.connectInstructor.match.entity.Match;
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
    public static class PatchSubject {
        private long id;
        private List<String> subjects;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchRegion {
        private long id;
        private List<String> regions;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchPassword {
        private long id;
        private String password;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchName {
        private long id;
        private String name;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchPhone {
        private long id;
        private String phone;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchProfileImg {
        private long id;
        private String profileImg;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchIntroduction {
        private long id;
        private String introduction;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchCareer {
        private long id;
        private String career;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchLectureFee {
        private long id;
        private String lectureFee;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchOption {
        private long id;
        private String option;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchOnLine {
        private long id;
        private boolean onLine;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchOffLine {
        private long id;
        private boolean offLine;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class PatchAddress {
        private long id;
        private String address;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Response {
        private long id;
        private String email;
        private String name;
        private boolean teacher = true;
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
        private List<String> subjects;
        private List<String> regions;
        private List<TeacherDto.MatchResponse> matches;
        private LocalDateTime lastLogin;
        private LocalDateTime lastModified;
        private LocalDateTime createdAt;


    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Element {
        private long id;
        private boolean onLine;
        private boolean offLine;
        private List<String> subjects;
        private List<String> regions;
        private String name;
        private String profileImg;
        private LocalDateTime createdAt;
    }
    @Setter@Getter@AllArgsConstructor@NoArgsConstructor
    public static class MatchResponse {
        private long matchId;
        private String studentName;
        private String date;
        private String timeslot;
        private List<String> subjects;
        private Match.MatchStatus status;
    }
}
