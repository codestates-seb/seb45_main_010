package com.codestates.connectInstructor.subject.repository;

import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findBySubjectName( String subjectName );
    @Query("SELECT DISTINCT s FROM Subject s JOIN s.teacherSubjects ts WHERE ts.teacher.id = :teacherId")
    List<Subject> findByTeacherId(long teacherId);
}
