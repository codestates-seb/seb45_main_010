package com.codestates.connectInstructor.security.oauth2.resolver;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class CustomRequestResolver implements OAuth2AuthorizationRequestResolver {
    private OAuth2AuthorizationRequestResolver defaultResolver;

    public CustomRequestResolver(
            ClientRegistrationRepository repo, String authorizationRequestBaseUri
    ) {

        defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(repo, authorizationRequestBaseUri);
    }

    @Override
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
        //짐작가는 이유 찾음 defaultResolver로 푸니까 현재 공급자를 kakaostudent로 인식해서 resolve가 안되니까 null이 리턴됨


        OAuth2AuthorizationRequest req = defaultResolver.resolve(request);

        String pathInfo = request.getRequestURI();

        log.info("pathInfo : {}", pathInfo);


        String registrationId = pathInfo.substring(pathInfo.lastIndexOf("/") + 1);

        log.info("registrationId : {}", registrationId);

        Map<String, Object> additionalParameters = new HashMap<>();

        if ("kakaostudent".equals(registrationId)) {
            additionalParameters.put("memberType", "student");

        } else if ("kakaoteacher".equals(registrationId)) {
            additionalParameters.put("memberType", "teacher");
        } else {
            return req;
        }


        OAuth2AuthorizationRequest customReq = OAuth2AuthorizationRequest
                .from(req)
                .clientId("kakao")
                .additionalParameters(additionalParameters)
                .build();

        return customReq;
    }

    @Override
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
        return defaultResolver.resolve(request, clientRegistrationId);
    }
}
