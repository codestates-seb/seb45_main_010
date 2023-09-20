package com.codestates.connectInstructor.schedule.service;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.schedule.entity.Schedule;
import com.codestates.connectInstructor.schedule.repository.ScheduleRepository;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleService {
    private final ScheduleRepository repository;
    private final TeacherRepository teacherRepository;

    public Schedule updateSchedule(Schedule schedule, long teacherId) {
        verifyTeacherId(teacherId);
        if (!verifyTeacherIdentity(teacherId)) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Optional<Schedule> optionalSchedule = repository.findByTeacherIdAndDate(teacherId, schedule.getDate());

        if (optionalSchedule.isEmpty()) {
            Schedule created = new Schedule();
            Teacher teacher = new Teacher();
            teacher.setId(teacherId);

            created.setTeacher(teacher);
            created.setDate(schedule.getDate());
            created.setTimeslots(schedule.getTimeslots());

            log.info("created의 teacherId {}", created.getTeacher().getId());

            Schedule saved = repository.save(created);

            log.info("saved의 teacherId {}", saved.getTeacher().getId());

            return saved;
        } else {
            Schedule found = optionalSchedule.get();

            List<String> timeslots = schedule.getTimeslots();

            int sizeFound = found.getTimeslots().size();
            for (int i = 0; i < sizeFound; i++) {
                String time = found.getTimeslots().get(i);

                if (!timeslots.contains(time)) {
                    found.getTimeslots().remove(time);
                }
            }

            for (String time : timeslots) {
                if (!found.getTimeslots().contains(time)) {
                    found.getTimeslots().add(time);
                }
            }

            return repository.save(found);
        }
    }

    private void verifyTeacherId(long id) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);

        if (optionalTeacher.isEmpty()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public Schedule getSchedule(long teacherId, String date) {
        verifyTeacherId(teacherId);

        Optional<Schedule> optionalSchedule = repository.findByTeacherIdAndDate(teacherId, date);

        if (optionalSchedule.isPresent()) {
            return optionalSchedule.get();
        } else {
            Schedule empty = new Schedule();
            Teacher teacher = new Teacher();
            teacher.setId(teacherId);

            empty.setTeacher(teacher);
            empty.setDate(date);
            empty.setTimeslots(new ArrayList<>());

            return empty;
        }
    }

    public List<Schedule> getAllSchedule(long teacherId) {
        verifyTeacherId(teacherId);

        List<Schedule> schedules = repository.findByTeacherId(teacherId);

        return schedules;
    }

    private boolean verifyTeacherIdentity(long teacherId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Teacher found = teacherRepository.findById(teacherId).get();

        return authentication.getName().toString().equals(found.getEmail()) ? true : false;
    }
}
