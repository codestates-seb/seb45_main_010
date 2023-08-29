package com.codestates.connectInstructor.student.repository;

import com.codestates.connectInstructor.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
