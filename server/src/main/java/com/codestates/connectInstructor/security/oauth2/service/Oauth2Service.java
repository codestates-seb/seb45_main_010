package com.codestates.connectInstructor.security.oauth2.service;

import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.security.jwt.JwtTokenizer;
import com.codestates.connectInstructor.security.member.Member;
import com.codestates.connectInstructor.security.oauth2.dto.JwtDto;
import com.codestates.connectInstructor.security.oauth2.dto.UserInfo;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class Oauth2Service {

    @Getter
    @Value("${KAKAO_CLIENT_ID}")
    private String clientId;

    @Getter
    @Value("${KAKAO_CLIENT_SECRET}")
    private String clientSecret;

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;

    public JwtDto loginWithCode(String code) throws JsonProcessingException {


        JwtDto jwtDto = new JwtDto();

        String accessToken = getAccessToken(code);

        UserInfo userInfo = getKakaoUserInfo(accessToken);
        String email = userInfo.getEmail();

        String typeByEmail = checkEmail(email);
        log.info("typeByEmail {}", typeByEmail);

        if (typeByEmail.equals("student")) {
            Student student = studentRepository.findByEmail(email).get();
            jwtDto.setAccessToken(delegateAccessToken(student));
            jwtDto.setRefreshToken(delegateRefreshToken(student));
        } else if (typeByEmail.equals("teacher")) {
            Teacher teacher = teacherRepository.findByEmail(email).get();
            jwtDto.setAccessToken(delegateAccessToken(teacher));
            jwtDto.setRefreshToken(delegateRefreshToken(teacher));
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return jwtDto;
    }

    public JwtDto signup(String code, String type) throws JsonProcessingException {

        JwtDto jwtDto = new JwtDto();

        String accessToken = getAccessToken(code);

        UserInfo userInfo = getKakaoUserInfo(accessToken);
        String email = userInfo.getEmail();

        String typeByEmail = checkEmail(email);

        if (!typeByEmail.equals("new")) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);

        if (type.equals("teacher")) {
            Teacher teacher = new Teacher();
            teacher.setName(userInfo.getName());
            teacher.setEmail(userInfo.getEmail());
            teacher.setProfileImg(userInfo.getProfileImg());
            teacher.setOauth(true);
            teacher.setRoles(customAuthorityUtils.getTEACHER_ROLES_STRING());
            teacher.setStatus(MemberStatus.ACTIVE);

            teacherRepository.save(teacher);
            log.info("강사 회원가입 성공");

            jwtDto.setAccessToken(delegateAccessToken(teacher));
            jwtDto.setRefreshToken(delegateRefreshToken(teacher));

            return jwtDto;
        } else if (type.equals("student")) {
            Student student = new Student();
            student.setName(userInfo.getName());
            student.setEmail(userInfo.getEmail());
            student.setProfileImg(userInfo.getProfileImg());
            student.setOauth(true);
            student.setRoles(customAuthorityUtils.getSTUDENT_ROLES_STRING());
            student.setStatus(MemberStatus.ACTIVE);

            studentRepository.save(student);
            log.info("학생 회원가입 성공");

            jwtDto.setAccessToken(delegateAccessToken(student));
            jwtDto.setRefreshToken(delegateRefreshToken(student));

            return jwtDto;
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public String checkEmail(String email) {
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);

        if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();

            if (teacher.isOauth()) return "teacher";
        } else if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (student.isOauth()) return "student";
        } else if (optionalTeacher.isEmpty() && optionalStudent.isEmpty())  {
            return "new";
        }

        throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }


    private String getAccessToken(String code) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_url", "http://localhost:5173");
        body.add("code", code);
        body.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        return jsonNode.get("access_token").asText();
    }

    private UserInfo getKakaoUserInfo(String accessToken) throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        String name = jsonNode.get("properties").get("nickname").asText();
        String email = jsonNode.get("kakao_account").get("email").asText();
        String profileImg = jsonNode.get("properties").get("profile_image").asText();

        UserInfo userInfo = new UserInfo();
        userInfo.setName(name);
        userInfo.setEmail(email);
        userInfo.setProfileImg(profileImg);

        return userInfo;
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
