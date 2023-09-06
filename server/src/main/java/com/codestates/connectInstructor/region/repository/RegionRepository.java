package com.codestates.connectInstructor.region.repository;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
}
