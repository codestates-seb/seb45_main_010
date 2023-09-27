//package com.codestates.connectInstructor.security.oauth2.resolver;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
//import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
//import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.UUID;
//
//@Slf4j
//public class CustomRequestResolver implements OAuth2AuthorizationRequestResolver {
//    private OAuth2AuthorizationRequestResolver defaultResolver;
//    private static final String CUSTOM_PARAM = "role";
//
//    public CustomRequestResolver (OAuth2AuthorizationRequestResolver defaultResolver) {
//        this.defaultResolver = defaultResolver;
//    }
//
//    @Override
//    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
//        OAuth2AuthorizationRequest authorizationRequest = this.defaultResolver.resolve(request);
//
//        return processAdditionalParameters(authorizationRequest);
//    }
//
//    @Override
//    public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
//        OAuth2AuthorizationRequest authorizationRequest = this.defaultResolver.resolve(request, clientRegistrationId);
//
//        return processAdditionalParameters(authorizationRequest);
//    }
//
//    private OAuth2AuthorizationRequest processAdditionalParameters(OAuth2AuthorizationRequest authorizationRequest) {
//        if (authorizationRequest == null) return null;
//
//        String redirectUri = UriComponentsBuilder
//                .fromUriString(authorizationRequest.getRedirectUri())
////                .queryParams(CUSTOM_PARAM, UUID.randomUUID())
//                .build(true).toUriString();
//
//        String test = authorizationRequest.getState();
//        log.info("{}", test);
////
////        String test2 =
////                authorizationRequest.getAdditionalParameters().get("role").toString();
////
////        if (test2 != null) log.info("role {}", test2);
//
////                authorizationRequest.getAdditionalParameters().get("role").toString(); null
//
////                authorizationRequest.getAuthorizationUri();
////        https://kauth.kakao.com/oauth/authorize
//
////                authorizationRequest.getAuthorizationRequestUri();
////        https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=21c47a1414c2f59aa53b7b7fc02ed513&scope=profile_nickname%20profile_image%20account_email&state=R7wCpbdai__Vg_LwalRhUjBAMGUHBI76qOQGP9HdC1k%3D&redirect_uri=http://localhost:8080/login/oauth2/code/kakao
//
////        log.info("test2 {}", test2);
//
//        return OAuth2AuthorizationRequest.from(authorizationRequest).redirectUri(redirectUri).build();
//    }
//
//}
