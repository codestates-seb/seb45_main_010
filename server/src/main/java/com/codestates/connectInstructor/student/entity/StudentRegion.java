package com.codestates.connectInstructor.student.entity;

import com.codestates.connectInstructor.region.entity.Region;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "REGION_ID")
    private Region region;
}
