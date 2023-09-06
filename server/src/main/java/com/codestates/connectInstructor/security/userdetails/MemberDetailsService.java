package com.codestates.connectInstructor.security.userdetails;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

/**
 * - Custom UserDetails 사용
 * - User Role을 DB에서 조회한 후, HelloAuthorityUtils로 Spring Security에게 Role 정보 제공
 */
@Component
public class MemberDetailsService implements UserDetailsService {
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(TeacherRepository teacherRepository,
                                StudentRepository studentRepository,
                                CustomAuthorityUtils authorityUtils) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(username);
        Optional<Student> optionalStudent = studentRepository.findByEmail(username);

        if(optionalTeacher.isPresent())
            return new TeacherDetails( optionalTeacher.get() );
        else if(optionalStudent.isPresent())
            return new StudentDetails( optionalStudent.get() );
        else
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    private final class TeacherDetails extends Teacher implements UserDetails {
        TeacherDetails( Teacher teacher) {
            setId(teacher.getId());
            setEmail(teacher.getEmail());
            setPassword(teacher.getPassword());
            setRoles(teacher.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
    private final class StudentDetails extends Student implements UserDetails {
        StudentDetails( Student student) {
            setId(student.getId());
            setEmail(student.getEmail());
            setPassword(student.getPassword());
            setRoles(student.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
