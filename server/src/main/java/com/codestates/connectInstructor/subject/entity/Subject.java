package com.codestates.connectInstructor.subject.entity;

import com.codestates.connectInstructor.teacher.entity.TeacherSubject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter@Getter@NoArgsConstructor
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String subjectName;
    @OneToMany(mappedBy = "subject", cascade = CascadeType.REMOVE)
    private List<TeacherSubject> teacherSubjects = new ArrayList<>();

}
