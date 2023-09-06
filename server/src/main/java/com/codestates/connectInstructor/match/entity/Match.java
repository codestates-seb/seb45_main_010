package com.codestates.connectInstructor.match.entity;

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
    @Column(nullable = false)
    private String subject;
    @Column(nullable = false)
    private String subjectDetail;

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
