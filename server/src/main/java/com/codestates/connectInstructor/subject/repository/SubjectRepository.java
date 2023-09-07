package com.codestates.connectInstructor.subject.repository;

import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findBySubjectName( String subjectName );
}
