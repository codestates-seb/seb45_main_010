package com.codestates.connectInstructor.teacher.repository;

import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmail(String email);

    @Query("SELECT DISTINCT t FROM Teacher t WHERE (t IN (SELECT DISTINCT t FROM Teacher t JOIN t.teacherSubjects ts WHERE ts.subject.subjectName IN :subjectNames) OR :subjectSize = 0) AND (t IN (SELECT DISTINCT t FROM Teacher t JOIN t.teacherRegions tr WHERE tr.region.regionName IN :regionNames) OR :regionSize = 0) AND t.name LIKE %:teacherName%")
    Page<Teacher> findTeachersBySubjectAndRegionAndTeacherName(String teacherName,
                                                               List<String> subjectNames,
                                                               List<String> regionNames,
                                                               int subjectSize,
                                                               int regionSize,
                                                               Pageable pageable);
}
