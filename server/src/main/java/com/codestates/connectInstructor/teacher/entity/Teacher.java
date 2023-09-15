package com.codestates.connectInstructor.teacher.entity;

import com.codestates.connectInstructor.audit.Auditable;
import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.security.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Teacher extends Auditable implements Member {
    //TODO 컬럼 제약 사항(길이 등등)은 프론트와 상의 후 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(length = 13, nullable = true)
    private String phone;

    @Column(nullable = true)
    private String profileImg; // TODO 회원가입 시 default로 할 때 null인지 default URL이 있는지

    @Column(columnDefinition = "TEXT", nullable = true)
    private String introduction;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String career;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String lectureFee;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String option;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean onLine;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean offLine;

    @Column(nullable = true, length = 100)
    private String address;

    @Column(nullable = false, name = "is_oauth")
    @ColumnDefault("false")
    private boolean oauth = false;

    @Enumerated(value = EnumType.ORDINAL)
    private MemberStatus status = MemberStatus.ACTIVE;

    @ElementCollection(fetch = FetchType.LAZY)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeacherRegion> teacherRegions = new ArrayList<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeacherSubject> teacherSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "teacher", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Match> matches = new ArrayList<>();

    @Column(name = "last_login_at")
    private LocalDateTime lastLogin;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModified;

    public void addTeacherSubject( TeacherSubject teacherSubject){
        teacherSubjects.add(teacherSubject);
    }
    public void removeTeacherSubject( TeacherSubject teacherSubject){
        teacherSubjects.remove(teacherSubjects.indexOf(teacherSubject));
    }
    public void addTeacherRegion( TeacherRegion teacherRegion){
        teacherRegions.add(teacherRegion);
    }
    public void removeTeacherRegion( TeacherRegion teacherRegion){
        teacherRegions.remove(teacherRegions.indexOf(teacherRegion));
    }
}
