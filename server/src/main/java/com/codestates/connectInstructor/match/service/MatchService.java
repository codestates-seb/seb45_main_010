package com.codestates.connectInstructor.match.service;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.match.dto.MatchDto;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.match.entity.MatchRegion;
import com.codestates.connectInstructor.match.entity.MatchSubject;
import com.codestates.connectInstructor.match.repository.MatchRepository;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.service.StudentService;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public MatchDto.GetResponse getBasicInformation(long studentId, long teacherId) {
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
        response.setStudentPhoneNumber(student.getPhoneNumber());
        response.setStudentEmail(student.getEmail());

        //TODO 스케줄 구현 후 수정
        response.setSchedules(List.of("9월 19일 화요일 / 13:00 ~ 14:00"));

        return response;
    }

    public Match postMatch(MatchDto.Post request) {
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
        match.setStudentPhoneNumber(request.getStudentPhoneNumber());
        match.setStudentEmail(request.getStudentEmail());
        match.setRemarks(request.getRemarks());

        return matchRepository.save(match);
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

        if (status.equals("cancel")) {
            match.setStatus(Match.MatchStatus.MATCH_CANCELLED);
        } else if (status.equals("answer")) {
            match.setStatus(Match.MatchStatus.MATCH_ANSWERED);
        } else {
            throw new BusinessLogicException(ExceptionCode.UNDEFINED_MATCH_STATUS);
        }

        return matchRepository.save(match);
    }
}
