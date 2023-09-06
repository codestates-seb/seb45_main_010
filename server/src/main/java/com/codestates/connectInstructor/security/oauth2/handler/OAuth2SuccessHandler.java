package com.codestates.connectInstructor.security.oauth2.handler;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.security.jwt.JwtTokenizer;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final StudentRepository studentRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;


    public OAuth2SuccessHandler(StudentRepository studentRepository, CustomAuthorityUtils authorityUtils, JwtTokenizer jwtTokenizer) {
        this.studentRepository = studentRepository;
        this.authorityUtils = authorityUtils;
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info("start!!!!");

//        if (request.getAttribute("memberType").equals("student")) {
//            log.info("##### 성공!!!!!");
//        }

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        String oauthType = token.getAuthorizedClientRegistrationId();
        String email = new String();

        if (oauthType.toLowerCase().equals("kakao")) {
            email = ((Map<String, Object>) token.getPrincipal().getAttribute("kakao_account")).get("email").toString();
        }

        Optional<Student> optionalStudent = studentRepository.findByEmail(email);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            if (student.isOauth()) {
                String accessToken = delegateAccessToken(student);
                String refreshToken = delegateRefreshToken(student);

//                String url = UriComponentsBuilder
//                        .fromUriString("http://localhost:8080/test")
//                        .build()
//                        .toUriString();

                response.setHeader("Authorization", "Bearer " + accessToken);
                response.setHeader("Refresh", refreshToken);

//                getRedirectStrategy().sendRedirect(request, response, url);
            }

            else {
                throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
            }

        } else {
            //필요한가?
            Student student = new Student();
            student.setEmail(email);
            student.setRoles(authorityUtils.getSTUDENT_ROLES_STRING());
            student.setOauth(true);

            studentRepository.save(student);

            String accessToken = delegateAccessToken(student);
            String refreshToken = delegateRefreshToken(student);

            MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

//            queryParams.add("Authorization", "Bearer " + accessToken);
//            queryParams.add("Refresh", refreshToken);

            String url = UriComponentsBuilder
                    .fromUriString("http://localhost:8080/test2")
                    .queryParams(queryParams)
                    .build()
                    .toUriString();

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);

            getRedirectStrategy().sendRedirect(request, response, url);
        }
    }

    private String delegateAccessToken(Student member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Student member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
