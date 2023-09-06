package com.codestates.connectInstructor.security.oauth2.service;

import com.codestates.connectInstructor.security.oauth2.user.CustomOAuth2User;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.student.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class CustomOauth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final StudentRepository studentRepository;
    private final StudentService studentService;
    private final CustomAuthorityUtils authorityUtils;


    public CustomOauth2Service(StudentRepository studentRepository, StudentService studentService, CustomAuthorityUtils authorityUtils) {
        this.studentRepository = studentRepository;
        this.studentService = studentService;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("load User 호출 성공");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User user = delegate.loadUser(userRequest);

        Map<String, Object> attributes = user.getAttributes();
        String oauthType = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();


        String email = new String();

        if (oauthType.toLowerCase().equals("kakao")) {
            email = ((Map<String, Object>) attributes.get("kakao_account")).get("email").toString();
        }

        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        Student student = new Student();

        if (optionalStudent.isEmpty()) {
            student.setEmail(email);
            student.setRoles(authorityUtils.getSTUDENT_ROLES_STRING());
            student.setOauth(true);
            student.setName(((Map<String, Object>)((Map<String, Object>) attributes.get("kakao_account")).get("profile")).get("nickname").toString());
            student.setProfileImg(((Map<String, Object>)((Map<String, Object>) attributes.get("kakao_account")).get("profile")).get("profile_image_url").toString());

            student = studentService.createStudent(student);
        }
        else {
            student = optionalStudent.get();
        }

        return new CustomOAuth2User(
                Collections.singleton(authorityUtils.getSTUDENT_ROLES().get(0)),
                attributes,
                userNameAttributeName,
                student.getEmail(),
                student.getName()
        );
    }
}

