package com.codestates.connectInstructor.match.entity;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.subject.entity.Subject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MatchRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "MATCH_ID")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "REGION_ID")
    private Region region;
}
