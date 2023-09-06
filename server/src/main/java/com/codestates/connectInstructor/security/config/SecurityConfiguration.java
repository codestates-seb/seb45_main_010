package com.codestates.connectInstructor.security.config;

import com.codestates.connectInstructor.security.filter.JwtAuthenticationFilter;
import com.codestates.connectInstructor.security.filter.JwtVerificationFilter;
import com.codestates.connectInstructor.security.handler.MemberAccessDeniedHandler;
import com.codestates.connectInstructor.security.handler.MemberAuthenticationEntryPoint;
import com.codestates.connectInstructor.security.handler.MemberAuthenticationFailureHandler;
import com.codestates.connectInstructor.security.handler.MemberAuthenticationSuccessHandler;
import com.codestates.connectInstructor.security.jwt.JwtTokenizer;
import com.codestates.connectInstructor.security.oauth2.handler.OAuth2FailureHandler;
import com.codestates.connectInstructor.security.oauth2.handler.OAuth2SuccessHandler;
import com.codestates.connectInstructor.security.oauth2.service.CustomOauth2Service;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.student.service.StudentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils; // 추가
    private final StudentRepository studentRepository;
    private final StudentService studentService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils, StudentRepository studentRepository, StudentService studentService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.studentRepository = studentRepository;
        this.studentService = studentService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2SuccessHandler(studentRepository, authorityUtils, jwtTokenizer))
                        .failureHandler(new OAuth2FailureHandler())
                        .userInfoEndpoint(user -> user.userService(new CustomOauth2Service(studentRepository, studentService, authorityUtils)))
                )
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )

        ;
        //.antMatchers(HttpMethod.GET, "/students/**").hasRole("---") 테스트 완료

        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.addExposedHeader("Authorization");
//        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            // jwtAuthenticationFilter.setFilterProcessesUrl("/login"); // 설정 안 하면 default가 "/login"
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);


            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
