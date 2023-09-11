package com.codestates.connectInstructor.match.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class MatchDto {
    @Getter
    @Builder
    public static class Post {
        long studentId;
        long teacherId;
        List<String> subjectNames;
        List<String> regions;
        String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";
        boolean isOnline;
        String studentName;
        String studentPhoneNumber;
        String studentEmail;
        String remarks;
    }
}
