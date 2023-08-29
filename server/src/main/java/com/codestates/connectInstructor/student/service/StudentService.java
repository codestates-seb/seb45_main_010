package com.codestates.connectInstructor.student.service;

import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Student createStudent(Student student) {
        verifyEmail(student.getEmail());

        if (!student.isOauth()) {
            //TODO 시큐리티 구현 후, password 암호화하기
        }

        Student saved = repository.save(student);

        return saved;
    }

    private void verifyEmail(String email) {
        Optional<Student> optionalStudent = repository.findByEmail(email);

        if (optionalStudent.isPresent()) throw new RuntimeException();
    }
}
