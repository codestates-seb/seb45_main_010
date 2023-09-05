package com.codestates.connectInstructor.match.repository;

import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
