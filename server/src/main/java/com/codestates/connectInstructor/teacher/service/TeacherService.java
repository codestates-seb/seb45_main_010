package com.codestates.connectInstructor.teacher.service;

import com.codestates.connectInstructor.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository repository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public TeacherService(TeacherRepository repository,
                          ApplicationEventPublisher applicationEventPublisher,
                          PasswordEncoder passwordEncoder,
                          CustomAuthorityUtils customAuthorityUtils) {
        this.repository = repository;
        this.applicationEventPublisher = applicationEventPublisher;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    public Teacher createTeacher(Teacher teacher) {
        verifyEmail(teacher.getEmail());

        if (!teacher.isOauth()) {
            //TODO 패스워드 인코딩
            teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        }
        teacher.setRoles(customAuthorityUtils.getTEACHER_ROLES_STRING());

        Teacher saved = repository.save(teacher);

        applicationEventPublisher.publishEvent(new SignupEvent(saved.getEmail(), saved.getName()));

        return saved;
    }

    public void verifyEmail(String email) {
        Optional<Teacher> optionalTeacher = repository.findByEmail(email);

        if (optionalTeacher.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }
}
