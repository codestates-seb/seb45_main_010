package com.codestates.connectInstructor.student.entity;

import com.codestates.connectInstructor.audit.Auditable;
import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.security.member.Member;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Student extends Auditable implements Member {
    //TODO 컬럼 제약 사항(길이 등등)은 프론트와 상의 후 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String profileImg;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Column(columnDefinition = "TEXT")
    private String option;

    private String phone;

    @Column(nullable = false, name = "is_oauth")
    private boolean isOauth = false;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(name = "last_login_at")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "student", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<StudentSubject> studentSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentRegion> studentRegions = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Match> matches = new ArrayList<>();



}
