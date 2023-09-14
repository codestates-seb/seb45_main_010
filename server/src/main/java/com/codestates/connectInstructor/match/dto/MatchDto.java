package com.codestates.connectInstructor.match.dto;

import com.codestates.connectInstructor.match.entity.Match;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class MatchDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class GetResponse {

        long studentId;
        long teacherId;
        List<String> subjects;
        List<String> regions;
        List<String> schedules;
        String studentName;
        String studentPhone;
        String studentEmail;
    }
    @Getter
    @Builder
    public static class Post {
        long studentId;
        long teacherId;
        boolean isOnline;
        List<String> subjects;
        List<String> regions;
        String schedule;
        String studentName;
        String studentPhone;
        String studentEmail;
        String remarks;
    }

    @Getter
    @Builder
    public static class Response {
        long id;
        long studentId;
        long teacherId;
        Match.MatchStatus status;
        List<String> matchSubjects;
        List<String> matchRegions;
        String schedule;
        boolean isOnline;
        String studentName;
        String studentPhone;
        String studentEmail;
        String remarks;
        String teacherName;
    }

    @Getter
    @Builder
    public static class Patch {
        long id;
        String status;
    }
}
