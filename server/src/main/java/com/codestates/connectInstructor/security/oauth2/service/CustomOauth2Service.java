//package com.codestates.connectInstructor.security.oauth2.service;
//
//import com.codestates.connectInstructor.security.oauth2.user.CustomOAuth2User;
//import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
//import com.codestates.connectInstructor.student.entity.Student;
//import com.codestates.connectInstructor.student.repository.StudentRepository;
//import com.codestates.connectInstructor.student.service.StudentService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Collections;
//import java.util.Map;
//import java.util.Optional;
//
//@Service
//@Transactional
//@Slf4j
//public class CustomOauth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//    private final StudentRepository studentRepository;
//    private final StudentService studentService;
//    private final CustomAuthorityUtils authorityUtils;
//
//
//    public CustomOauth2Service(StudentRepository studentRepository, StudentService studentService, CustomAuthorityUtils authorityUtils) {
//        this.studentRepository = studentRepository;
//        this.studentService = studentService;
//        this.authorityUtils = authorityUtils;
//    }
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        OAuth2User user = delegate.loadUser(userRequest);
//
//        Map<String, Object> attributes = user.getAttributes();
//        String oauthType = userRequest.getClientRegistration().getRegistrationId();
//        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//
//        String email = ((Map<String, Object>) attributes.get("kakao_account")).get("email").toString();
//        String name = ((Map<String, Object>)((Map<String, Object>) attributes.get("kakao_account")).get("profile")).get("nickname").toString();
//        String profileImg = ((Map<String, Object>)((Map<String, Object>) attributes.get("kakao_account")).get("profile")).get("profile_image_url").toString();
//
//        return new CustomOAuth2User(
//                Collections.singleton(authorityUtils.getSTUDENT_ROLES().get(0)),
//                attributes,
//                userNameAttributeName,
//                email,
//                name,
//                profileImg
//        );
//    }
//}
//
