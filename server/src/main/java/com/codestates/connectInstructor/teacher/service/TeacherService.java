package com.codestates.connectInstructor.teacher.service;

import com.codestates.connectInstructor.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository repository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public TeacherService(TeacherRepository repository, ApplicationEventPublisher applicationEventPublisher) {
        this.repository = repository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public Teacher createTeacher(Teacher teacher) {
        verifyEmail(teacher.getEmail());

        if (!teacher.isOauth()) {
            //TODO 패스워드 인코딩
        }
        Teacher saved = repository.save(teacher);

        applicationEventPublisher.publishEvent(new SignupEvent(saved.getEmail(), saved.getName()));

        return saved;
    }

    public void verifyEmail(String email) {
        Optional<Teacher> optionalTeacher = repository.findByEmail(email);

        if (optionalTeacher.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }
}
