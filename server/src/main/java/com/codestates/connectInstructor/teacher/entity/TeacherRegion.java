package com.codestates.connectInstructor.teacher.entity;

import com.codestates.connectInstructor.region.entity.Region;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter@Getter@NoArgsConstructor
public class TeacherRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="TEACHER_ID", nullable = false)
    private Teacher teacher;
    @ManyToOne
    @JoinColumn(name="REGION_ID", nullable = false)
    private Region region;

}
