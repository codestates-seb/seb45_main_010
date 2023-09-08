package com.codestates.connectInstructor.teacher.service;

import com.codestates.connectInstructor.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.repository.SubjectRepository;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.entity.TeacherSubject;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final SubjectService subjectService;
    private final RegionService regionService;

    public TeacherService(TeacherRepository teacherRepository,
                          ApplicationEventPublisher applicationEventPublisher,
                          PasswordEncoder passwordEncoder,
                          CustomAuthorityUtils customAuthorityUtils,
                          SubjectService subjectService,
                          RegionService regionService) {
        this.teacherRepository = teacherRepository;
        this.applicationEventPublisher = applicationEventPublisher;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
        this.subjectService = subjectService;
        this.regionService = regionService;
    }

    public Teacher createTeacher(Teacher teacher) {
        verifyEmail(teacher.getEmail());

        if (!teacher.isOauth()) {
            //TODO 패스워드 인코딩
            teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        }
        teacher.setRoles(customAuthorityUtils.getTEACHER_ROLES_STRING());

        Teacher saved = teacherRepository.save(teacher);

        applicationEventPublisher.publishEvent(new SignupEvent(saved.getEmail(), saved.getName()));

        return saved;
    }
    public Teacher updateTeacher( Teacher teacher ){
        Teacher findTeacher = findVerifiedTeacher(teacher.getId());

        Optional.ofNullable(teacher.getName())
                .ifPresent(name -> findTeacher.setName(name));
        Optional.ofNullable(teacher.getPhone())
                .ifPresent(phone -> findTeacher.setPhone(phone));
        Optional.ofNullable(teacher.getProfileImg())
                .ifPresent(profileImg -> findTeacher.setProfileImg(profileImg));
        Optional.ofNullable(teacher.getIntroduction())
                .ifPresent(introduction -> findTeacher.setIntroduction(introduction));
        Optional.ofNullable(teacher.getCareer())
                .ifPresent(career -> findTeacher.setCareer(career));
        Optional.ofNullable(teacher.getLectureFee())
                .ifPresent(lectureFee -> findTeacher.setLectureFee(lectureFee));
        Optional.ofNullable(teacher.getOption())
                .ifPresent(option -> findTeacher.setOption(option));
        Optional.ofNullable(teacher.getAddress())
                .ifPresent(address -> findTeacher.setAddress(address));

        if( teacher.isOnLine() != findTeacher.isOnLine())
            findTeacher.setOnLine(teacher.isOnLine());
        if( teacher.isOffLine() != findTeacher.isOffLine())
            findTeacher.setOffLine(teacher.isOffLine());

        findTeacher.setLastModified(LocalDateTime.now());

        return teacherRepository.save(findTeacher);
    }
    public void addSubjectToTeacher( long teacherId, String subjectName ){
        Teacher teacher = findVerifiedTeacher(teacherId);
        Subject subject = subjectService.findVerifiedSubject(subjectName);

        List<TeacherSubject> teacherSubjects = teacher.getTeacherSubjects();
        for( TeacherSubject teacherSubject : teacherSubjects ){
            if( teacherSubject.getTeacher().getId() == teacherId )
                if( teacherSubject.getSubject().getSubjectName().equals(subjectName))
                    throw new BusinessLogicException( ExceptionCode.TEACHER_SUBJECT_EXISTS );
        }

        TeacherSubject teacherSubject = new TeacherSubject();
        teacherSubject.setTeacher(teacher);
        teacherSubject.setSubject(subject);

        teacher.addTeacherSubject(teacherSubject);

        teacherRepository.save(teacher);
    }
    public void deleteSubjectFromTeacher( long teacherId, String subjectName ){
        Teacher teacher = findVerifiedTeacher(teacherId);
        Subject subject = subjectService.findVerifiedSubject(subjectName);

        List<TeacherSubject> teacherSubjects = teacher.getTeacherSubjects();
        for( TeacherSubject teacherSubject : teacherSubjects ){
            if( teacherSubject.getTeacher().getId() == teacherId )
                if( teacherSubject.getSubject().getSubjectName().equals(subjectName))
                    teacher.removeTeacherSubject(teacherSubject);
        }

        teacherRepository.save(teacher);
    }
    public Teacher findTeacher( long teacherId){
        return findVerifiedTeacher(teacherId);
    }
    public Page<Teacher> searchTeachers(String teacherName, List<String> subjectNames,
                                        List<String> regionNames, int page, int size){

        return teacherRepository.findTeachersBySubjectAndRegionAndTeacherName(teacherName, subjectNames, regionNames,
                PageRequest.of(page,size, Sort.by("createdAt").descending()) );
    }
    @Transactional(readOnly = true)
    public Teacher findVerifiedTeacher(long teacherId){
        Optional<Teacher> teacher = teacherRepository.findById(teacherId);
        Teacher findTeacher =
                teacher.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findTeacher;
    }
    public void verifyEmail(String email) {
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalTeacher.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }
}
