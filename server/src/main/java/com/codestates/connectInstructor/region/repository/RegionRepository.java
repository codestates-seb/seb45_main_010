package com.codestates.connectInstructor.region.repository;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByRegionName( String regionName );
    @Query("SELECT DISTINCT r FROM Region r JOIN r.teacherRegions tr WHERE tr.teacher.id = :teacherId")
    List<Region> findByTeacherId(long teacherId);
}
