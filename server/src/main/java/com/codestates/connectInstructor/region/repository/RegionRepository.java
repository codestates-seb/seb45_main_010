package com.codestates.connectInstructor.region.repository;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByRegionName( String regionName );
}
