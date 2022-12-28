package com.ikujo.stackoverflow.config;

import com.ikujo.stackoverflow.global.auth.JwtAuthenticationFilter;
import com.ikujo.stackoverflow.global.auth.JwtTokenizer;
import com.ikujo.stackoverflow.global.auth.handler.MemberAuthenticationFailureHandler;
import com.ikujo.stackoverflow.global.auth.handler.MemberAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin() // H2 웹 콘솔을 정상적으로 사용할 수 있도록 하는 역할
                .and()
                .csrf().disable() // csrf 공격에 대한 설정 비활성화
                .cors(withDefaults()) // withDefaults()일 경우 corsConfigurationSource 이름으로 등록된 Bean 이용
                .formLogin().disable() // 인증 관련 Security Filter 비활성화
                .httpBasic().disable() // HTTP Basic 인증 방식 비활성화
                .apply(new CustomFilterConfigurer()) // 직접 구현한 JwtAuthenticationFilter 등록
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll() // 모든 HTTP request 요청에 접근 허용
                );

        return http.build();
    }

    /**
     * PasswordEncoder Bean 객체 생성
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * CorsConfigurationSource Bean 생성(구체적인 CORS 정책 설정)
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처에 대해 스크립트 기반 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE")); // 지정한 HTTP Method에 대한 통신 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // UrlBasedCorsConfigurationSource 생성
        source.registerCorsConfiguration("/**", configuration); // 모든 URL에 앞에서 구성한 CORS 정책 적용

        return source;
    }

    /**
     * Custom Filter Configurer, JWTAuthenticationFilter를 등록하는 역할
     */
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        /**
         * Configure 커스터마이징
         */
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            // AuthenticationManager 객체 얻기
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // JwtAuthenticationFilter 생성 (AuthenticationManager와 JwtTokenizer DI)
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            // 로그인 request URL
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");

            // 인증 성공 또는 실패 핸들러
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            // Spring Security Filter Chain 추가
            builder.addFilter(jwtAuthenticationFilter);
        }
    }

}
