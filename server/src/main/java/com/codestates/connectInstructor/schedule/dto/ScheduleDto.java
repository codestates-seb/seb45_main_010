package com.codestates.connectInstructor.schedule.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

public class ScheduleDto {
    @Getter
    @Builder
    public static class Single {
        @NotNull
        private long teacherId;

        @NotNull
        private String date;

        @NotNull
        private List<String> timeslots;
    }

    @Getter
    @Builder
    public static class Multiple {
        private long teacherId;
        private List<Data> schedules;
    }

    @Getter
    @Builder
    public static class Data {
        private String date;
        private List<String> timeslots;
    }
}
