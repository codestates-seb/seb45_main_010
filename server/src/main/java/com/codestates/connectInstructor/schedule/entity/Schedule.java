package com.codestates.connectInstructor.schedule.entity;

import com.codestates.connectInstructor.teacher.entity.Teacher;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Teacher teacher;

    @Column(nullable = false)
    private String date;

    @ElementCollection
    private List<String> timeslots = new ArrayList<>();

}
