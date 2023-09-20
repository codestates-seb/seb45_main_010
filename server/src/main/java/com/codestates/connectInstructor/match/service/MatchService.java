package com.codestates.connectInstructor.match.service;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.match.dto.MatchDto;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.match.entity.MatchRegion;
import com.codestates.connectInstructor.match.entity.MatchSubject;
import com.codestates.connectInstructor.match.repository.MatchRepository;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.schedule.dto.ScheduleDto;
import com.codestates.connectInstructor.schedule.entity.Schedule;
import com.codestates.connectInstructor.schedule.repository.ScheduleRepository;
import com.codestates.connectInstructor.schedule.service.ScheduleService;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.student.service.StudentService;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MatchService {
    private final TeacherService teacherService;
    private final StudentService studentService;
    private final SubjectService subjectService;
    private final RegionService regionService;
    private final MatchRepository matchRepository;
    private final ScheduleService scheduleService;
    private final ScheduleRepository scheduleRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    public MatchDto.GetResponse getBasicInformation(long studentId, long teacherId) {
        if (!verifyStudentIdentity(studentId)) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        MatchDto.GetResponse response = new MatchDto.GetResponse();

        Student student = studentService.findStudentById(studentId);
        Teacher teacher = teacherService.findVerifiedTeacher(teacherId);

        response.setStudentId(studentId);
        response.setTeacherId(teacherId);
        response.setSubjects(
                teacher.getTeacherSubjects()
                        .stream()
                        .map(teacherSubject -> teacherSubject.getSubject().getSubjectName())
                        .collect(Collectors.toList()));
        response.setRegions(
                teacher.getTeacherRegions()
                        .stream()
                        .map(teacherRegion -> teacherRegion.getRegion().getRegionName())
                        .collect(Collectors.toList())
        );
        response.setStudentName(student.getName());
        response.setStudentPhone(student.getPhone());
        response.setStudentEmail(student.getEmail());

        List<Schedule> schedules = scheduleService.getAllSchedule(teacherId);
        List<ScheduleDto.Data> dataList = new LinkedList<>();

        for (Schedule schedule : schedules) {
            ScheduleDto.Data data = ScheduleDto.Data.builder()
                    .date(schedule.getDate())
                    .timeslots(schedule.getTimeslots())
                    .build();

            dataList.add(data);
        }

        response.setSchedules(dataList);

        return response;
    }

    public Match postMatch(MatchDto.Post request) {
        if (!verifyStudentIdentity(request.getStudentId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Match match = new Match();
        match.setStatus(Match.MatchStatus.MATCH_REQUEST);

        for (String subject : request.getSubjects()) {
            MatchSubject matchSubject = new MatchSubject();
            matchSubject.setMatch(match);
            matchSubject.setSubject(subjectService.findVerifiedSubject(subject));

            match.getMatchSubjects().add(matchSubject);
        }

        for (String region : request.getRegions()) {
            MatchRegion matchRegion = new MatchRegion();
            matchRegion.setMatch(match);
            matchRegion.setRegion(regionService.findVerifiedRegion(region));

            match.getMatchRegions().add(matchRegion);
        }

        match.setOnline(request.isOnline());
        match.setStudent(studentService.findStudentById(request.getStudentId()));
        match.setTeacher(teacherService.findVerifiedTeacher(request.getTeacherId()));
        match.setStudentName(request.getStudentName());
        match.setStudentPhone(request.getStudentPhone());
        match.setStudentEmail(request.getStudentEmail());
        match.setRemarks(request.getRemarks());
        match.setDate(request.getDate());
        match.setTimeslot(request.getTimeslot());

        verifyAndmodifySchedule(request.getTeacherId(), request.getDate(), request.getTimeslot());

        return matchRepository.save(match);
    }

    private void verifyAndmodifySchedule(long teacherId, String date, String timeslot) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findByTeacherIdAndDate(teacherId, date);

        if (optionalSchedule.isEmpty()) throw new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND);

        Schedule schedule = optionalSchedule.get();

        if (schedule.getTimeslots().contains(timeslot)) {
            schedule.getTimeslots().remove(timeslot);

            scheduleRepository.save(schedule);
        } else {
            throw new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND);
        }
    }

    public Match getMatch(long matchId) {
        return findverifyMatchById(matchId);
    }

    public Match findverifyMatchById(long id) {
        Optional<Match> optionalMatch = matchRepository.findById(id);
        Match match = optionalMatch.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MATCH_NOT_FOUND));

        return match;
    }

    public Match patchMatch(long id, String status) {
        Match match = findverifyMatchById(id);

        if (!verifyStudentIdentity(match.getStudent().getId()) && ! verifyTeacherIdentity(match.getTeacher().getId())) {
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);
        }

        if (status.equals("cancel")) {
            match.setStatus(Match.MatchStatus.MATCH_CANCELLED);
        } else if (status.equals("answer")) {
            match.setStatus(Match.MatchStatus.MATCH_ANSWERED);
        } else {
            throw new BusinessLogicException(ExceptionCode.UNDEFINED_MATCH_STATUS);
        }

        return matchRepository.save(match);
    }

    private boolean verifyStudentIdentity(long studentId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Optional<Student> optionalStudent = studentRepository.findById(studentId);

        if (optionalStudent.isEmpty()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);

        Student found = optionalStudent.get();

        return authentication.getName().toString().equals(found.getEmail()) ? true : false;
    }

    private boolean verifyTeacherIdentity(long teacherId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Optional<Teacher> optionalTeacher = teacherRepository.findById(teacherId);

        if (optionalTeacher.isEmpty()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);

        Teacher found = optionalTeacher.get();

        return authentication.getName().toString().equals(found.getEmail()) ? true : false;
    }
}
