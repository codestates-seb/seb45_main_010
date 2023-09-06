package com.codestates.connectInstructor.subject.repository;

import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
