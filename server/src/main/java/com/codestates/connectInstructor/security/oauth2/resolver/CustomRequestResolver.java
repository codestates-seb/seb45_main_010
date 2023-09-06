//package com.codestates.connectInstructor.security.oauth2.resolver;
//
//import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
//import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
//import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.HashMap;
//import java.util.Map;
//
//public class CustomRequestResolver implements OAuth2AuthorizationRequestResolver {
//    private OAuth2AuthorizationRequestResolver defaultResolver;
//
//    public CustomRequestResolver(
//            ClientRegistrationRepository repo, String authorizationRequestBaseUri
//    ) {
//        defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(repo, authorizationRequestBaseUri);
//    }
//
//    @Override
//    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
//        OAuth2AuthorizationRequest req = defaultResolver.resolve(request);
//
//        return req;
//    }
//
//    @Override
//    public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
//
//        OAuth2AuthorizationRequest req = null;
//
//        if (clientRegistrationId.startsWith("kakao")) {
//            req = defaultResolver.resolve(request, "kakao");
//
//            Map<String, Object> extraParams = new HashMap<>();
//            extraParams.putAll(req.getAdditionalParameters());
//            extraParams.put("memberType", clientRegistrationId.substring(clientRegistrationId.indexOf('o') + 1));
//
//            OAuth2AuthorizationRequest customReq =
//                    OAuth2AuthorizationRequest
//                            .from(req)
//                            .additionalParameters(extraParams)
//                            .build();
//        }
//
//        else {
//            req = defaultResolver.resolve(request, clientRegistrationId);
//        }
//
//        return req;
//    }
//}
