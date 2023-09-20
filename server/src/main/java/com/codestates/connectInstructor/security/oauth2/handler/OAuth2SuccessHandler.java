package com.codestates.connectInstructor.security.oauth2.handler;

import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.email.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.security.jwt.JwtTokenizer;
import com.codestates.connectInstructor.security.member.Member;
import com.codestates.connectInstructor.security.oauth2.user.CustomOAuth2User;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Slf4j
@Transactional
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final StudentRepository studentRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
    private final ApplicationEventPublisher publisher;
    private final TeacherRepository teacherRepository;



    public OAuth2SuccessHandler(StudentRepository studentRepository, CustomAuthorityUtils authorityUtils, JwtTokenizer jwtTokenizer, ApplicationEventPublisher publisher, TeacherRepository teacherRepository) {
        this.studentRepository = studentRepository;
        this.authorityUtils = authorityUtils;
        this.jwtTokenizer = jwtTokenizer;
        this.publisher = publisher;
        this.teacherRepository = teacherRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String query = request.getQueryString();

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        Optional<Student> optionalStudent = studentRepository.findByEmail(user.getEmail());
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(user.getEmail());

        Teacher teacher = new Teacher();
        Student student = new Student();

        if (!query.contains("state=")) {
            if (optionalStudent.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);

            if (optionalTeacher.isEmpty()) {
                teacher.setEmail(user.getEmail());
                teacher.setName(user.getName());
                teacher.setProfileImg(user.getProfileImg());
                teacher.setOauth(true);
                teacher.setStatus(MemberStatus.ACTIVE);
                teacher.setRoles(authorityUtils.getTEACHER_ROLES_STRING());

                teacherRepository.save(teacher);

                publisher.publishEvent(new SignupEvent(teacher.getEmail(), teacher.getName()));
            } else {
                teacher = optionalTeacher.get();
            }

            String accessToken = delegateAccessToken(teacher);
            String refreshToken = delegateRefreshToken(teacher);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);
        } else {
            if (optionalStudent.isEmpty()) {

                student.setEmail(user.getEmail());
                student.setName(user.getName());
                student.setProfileImg(user.getProfileImg());
                student.setOauth(true);
                student.setStatus(MemberStatus.ACTIVE);
                student.setRoles(authorityUtils.getSTUDENT_ROLES_STRING());

                studentRepository.save(student);

                publisher.publishEvent(new SignupEvent(student.getEmail(), student.getName()));
            }

            else {
                student = optionalStudent.get();
            }

            String accessToken = delegateAccessToken(student);
            String refreshToken = delegateRefreshToken(student);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);
        }
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("id", member.getId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
