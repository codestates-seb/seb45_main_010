package com.codestates.connectInstructor.region.entity;

import com.codestates.connectInstructor.student.entity.StudentRegion;
import com.codestates.connectInstructor.teacher.entity.TeacherRegion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter@Setter@NoArgsConstructor
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String regionName;
    @OneToMany(mappedBy = "region", cascade = CascadeType.REMOVE)
    private List<TeacherRegion> teacherRegions = new ArrayList<>();
    @OneToMany(mappedBy = "region", cascade = CascadeType.REMOVE)
    private List<StudentRegion> studentRegions = new ArrayList<>();
}
