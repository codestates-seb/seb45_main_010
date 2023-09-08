package com.codestates.connectInstructor.match.entity;

import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.subject.entity.Subject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter@Setter@NoArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status;

    @ManyToOne
    @JoinColumn(name = "SUBJECT_ID")
    private Subject subject;

    @Column(nullable = false)
    private String schedule;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    private String studentName;

    @Column(nullable = false)
    private String phoneNumber;

    private String email;

    private boolean isOnline;

//    @JoinColumn(name = "REGION_ID")
//    private Region region;

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
