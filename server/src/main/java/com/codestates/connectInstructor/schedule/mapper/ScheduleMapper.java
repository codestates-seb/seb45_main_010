package com.codestates.connectInstructor.schedule.mapper;

import com.codestates.connectInstructor.schedule.dto.ScheduleDto;
import com.codestates.connectInstructor.schedule.entity.Schedule;
import org.mapstruct.Mapper;

import java.util.LinkedList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    default ScheduleDto.Single scheduleToSingle(Schedule updated) {
        return ScheduleDto.Single.builder()
                .teacherId(updated.getTeacher().getId())
                .date(updated.getDate())
                .timeslots(updated.getTimeslots())
                .build();
    }

    Schedule singleToSchedule(ScheduleDto.Single request);

    default ScheduleDto.Multiple schedulesToMultiple(List<Schedule> found, long teacherId) {
        List<ScheduleDto.Data> dataList = new LinkedList<>();

        for (Schedule schedule : found) {
            ScheduleDto.Data data = ScheduleDto.Data.builder()
                    .date(schedule.getDate())
                    .timeslots(schedule.getTimeslots())
                    .build();

            dataList.add(data);
        }

        return ScheduleDto.Multiple.builder()
                .teacherId(teacherId)
                .schedules(dataList)
                .build();
    }
}
