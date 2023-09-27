package com.codestates.connectInstructor.email.service;

import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.email.event.ResetPasswordEvent;
import com.codestates.connectInstructor.email.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class EmailService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordEncoder passwordEncoder;

    @Value("${emailEncryptionSecretKey}")
    String password;

    public String encodePath(String email, String name) {
        StandardPBEStringEncryptor jasypt = new StandardPBEStringEncryptor();

        jasypt.setPassword(password);
        jasypt.setAlgorithm("PBEWITHMD5ANDDES");

        String text = email.concat(",,,").concat(name);

        String encrypted = jasypt.encrypt(text);

        return Base64.getEncoder().encodeToString(encrypted.getBytes());
    }

    public Map<String, String> decodePath(String encrypted) {
        String base64Decoded = new String(Base64.getDecoder().decode(encrypted));

        StandardPBEStringEncryptor jasypt = new StandardPBEStringEncryptor();

        jasypt.setPassword(password);
        jasypt.setAlgorithm("PBEWITHMD5ANDDES");

        String decrypted = jasypt.decrypt(base64Decoded);

        String[] splits = decrypted.split(",,,");

        Map<String, String> map = new HashMap<>();

        map.put("email", splits[0]);
        map.put("name", splits[1]);

        return map;
    }

    public void verifyEmail(String encryptedPath) {
        Map<String, String> map = decodePath(encryptedPath);

        String email = map.get("email");
        String name = map.get("name");

        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (!student.getName().equals(name)) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }

            student.setStatus(MemberStatus.ACTIVE);
            studentRepository.save(student);

            applicationEventPublisher.publishEvent(new SignupEvent(email, name));
        } else if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();

            if (!teacher.getName().equals(name)) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }

            teacher.setStatus(MemberStatus.ACTIVE);
            teacherRepository.save(teacher);

            applicationEventPublisher.publishEvent(new SignupEvent(email, name));
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public void resetPassword(String encryptedPath) {
        Map<String, String> map = decodePath(encryptedPath);

        String email = map.get("email");
        String name = map.get("name");

        String password = passwordEncoder.encode("pass1234");

        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (!student.getName().equals(name)) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            if (student.isOauth()) throw new BusinessLogicException(ExceptionCode.SOCIAL_USER_PASSWORD);

            student.setPassword(password);

            studentRepository.save(student);
        }

        else {
            Teacher teacher = optionalTeacher.get();

            if (!teacher.getName().equals(name)) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            if (teacher.isOauth()) throw new BusinessLogicException(ExceptionCode.SOCIAL_USER_PASSWORD);

            teacher.setPassword(password);

            teacherRepository.save(teacher);
        }
    }

    public void sendResetEmail(String email) {
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (student.isOauth()) throw new BusinessLogicException(ExceptionCode.SOCIAL_USER_PASSWORD);

            applicationEventPublisher.publishEvent(new ResetPasswordEvent(email, student.getName()));
        }

        else {
            Teacher teacher = optionalTeacher.get();

            if (teacher.isOauth()) throw new BusinessLogicException(ExceptionCode.SOCIAL_USER_PASSWORD);

            applicationEventPublisher.publishEvent(new ResetPasswordEvent(email, teacher.getName()));
        }
    }
}
