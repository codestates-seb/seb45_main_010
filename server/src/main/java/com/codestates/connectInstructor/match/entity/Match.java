package com.codestates.connectInstructor.match.entity;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.entity.StudentSubject;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter@Setter@NoArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status = MatchStatus.MATCH_REQUEST;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchSubject> matchSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchRegion> matchRegions = new ArrayList<>();

    //TODO schedule 구현 후 수정
    @Column(nullable = false)
    private String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";

    @Column(nullable = false)
    private boolean isOnline;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "TEACHER_ID", nullable = false)
    private Teacher teacher;

    private String studentName;

    @Column(nullable = false)
    private String studentPhone;

    private String studentEmail;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    public enum MatchStatus {
        MATCH_REQUEST("수업요청"),
        MATCH_ANSWERED("답변완료"),
        MATCH_CANCELLED("취소완료");

        @Getter
        private String status;

        MatchStatus(String status) {
            this.status = status;
        }
    }
}
