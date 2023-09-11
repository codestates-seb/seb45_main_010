package com.codestates.connectInstructor.match.dto;

import com.codestates.connectInstructor.match.entity.Match;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class MatchDto {
    @Getter
    @Builder
    public static class Start {
        long studentId;
        long teacherId;
    }

    @Getter
    @Setter
    public static class GetResponse {
        long studentId;
        long teacherId;
        List<String> subjects;
        List<String> regions;
        List<String> schedules = List.of("9월 19일 화요일 / 13:00 ~ 14:00");
        String studentName;
        String studentPhoneNumber;
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
        String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";
        String studentName;
        String studentPhoneNumber;
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
        String studentPhoneNumber;
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
