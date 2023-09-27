package com.codestates.connectInstructor.schedule.controller;

import com.codestates.connectInstructor.schedule.dto.ScheduleDto;
import com.codestates.connectInstructor.schedule.entity.Schedule;
import com.codestates.connectInstructor.schedule.mapper.ScheduleMapper;
import com.codestates.connectInstructor.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/schedules")
@Validated
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleMapper mapper;
    private final ScheduleService service;

    @PatchMapping
    public ResponseEntity patchSchedule(@RequestBody @Valid ScheduleDto.Single request) {
        Schedule schedule = mapper.singleToSchedule(request);

        Schedule updated = service.updateSchedule(schedule, request.getTeacherId());

        ScheduleDto.Single response = mapper.scheduleToSingle(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getSchedule(@RequestParam @Positive long teacherId,
//                                      @RequestParam String date) {
//        Schedule found = service.getSchedule(teacherId, date);
//
//        ScheduleDto.Single response = mapper.scheduleToSingle(found);
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity getAllSchedule(@RequestParam @Positive long teacherId) {
        List<Schedule> found = service.getAllSchedule(teacherId);

        ScheduleDto.Multiple response = mapper.schedulesToMultiple(found, teacherId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
