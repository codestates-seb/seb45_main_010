package com.codestates.connectInstructor.teacher.entity;

import com.codestates.connectInstructor.audit.Auditable;
import com.codestates.connectInstructor.common.MemberStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Teacher extends Auditable {
    //TODO 컬럼 제약 사항(길이 등등)은 프론트와 상의 후 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    private String password;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String introduction;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String career;

    @Column(nullable = false, length = 100)
    private String address;

    @Column(nullable = false, name = "is_oauth")
    private boolean isOauth = false;

    @Enumerated(value = EnumType.ORDINAL)
    private MemberStatus status = MemberStatus.ACTIVE;

    @Column(name = "last_login_at")
    private LocalDateTime lastLogin;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModified;
}
