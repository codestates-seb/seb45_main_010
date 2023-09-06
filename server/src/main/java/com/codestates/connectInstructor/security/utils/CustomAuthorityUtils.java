package com.codestates.connectInstructor.security.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component@Getter
public class CustomAuthorityUtils {

    private final List<GrantedAuthority> TEACHER_ROLES = AuthorityUtils.createAuthorityList("ROLE_TEACHER");
    private final List<GrantedAuthority> STUDENT_ROLES = AuthorityUtils.createAuthorityList("ROLE_STUDENT");
    private final List<String> TEACHER_ROLES_STRING = List.of("TEACHER");
    private final List<String> STUDENT_ROLES_STRING = List.of("STUDENT");
//
//    // 메모리 상의 Role을 기반으로 권한 정보 생성.
//    public List<GrantedAuthority> createAuthorities(String email) {
//        if (email.equals(adminMailAddress)) {
//            return ADMIN_ROLES;
//        }
//        return USER_ROLES;
//    }

    // DB에 저장된 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }
//
//    // DB 저장 용
//    public List<String> createRoles(String email) {
//        if (email.equals(adminMailAddress)) {
//            return ADMIN_ROLES_STRING;
//        }
//        return USER_ROLES_STRING;
//    }
}
