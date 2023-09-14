package com.codestates.connectInstructor.schedule.repository;

import com.codestates.connectInstructor.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findByTeacherIdAndDate(long teacherId, String date);

    List<Schedule> findByTeacherId(long teacherId);
}
