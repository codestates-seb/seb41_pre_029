package com.ikujo.stackoverflow.config;

import com.ikujo.stackoverflow.global.auth.filter.JwtAuthenticationFilter;
import com.ikujo.stackoverflow.global.auth.filter.JwtVerificationFilter;
import com.ikujo.stackoverflow.global.auth.handler.MemberAccessDeniedHandler;
import com.ikujo.stackoverflow.global.auth.handler.MemberAuthenticationEntryPoint;
import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
import com.ikujo.stackoverflow.global.auth.handler.MemberAuthenticationFailureHandler;
import com.ikujo.stackoverflow.global.auth.handler.MemberAuthenticationSuccessHandler;
import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
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
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin() // H2 웹 콘솔을 정상적으로 사용할 수 있도록 하는 역할
                .and()
                .csrf().disable() // csrf 공격에 대한 설정 비활성화
                .cors(withDefaults()) // withDefaults()일 경우 corsConfigurationSource 이름으로 등록된 Bean 이용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 생성하지 않도록 설정
                .and()
                .formLogin().disable() // 인증 관련 Security Filter 비활성화
                .httpBasic().disable() // HTTP Basic 인증 방식 비활성화
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer()) // 직접 구현한 JwtAuthenticationFilter 등록
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/questions/**").hasRole("USER")
                        .requestMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/questions/**").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
                        .requestMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
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
     *
     * setAllowCredentials(true) : 크리덴셜 관련한 정보 허용?
     * Origins : 요청 호스트를 허용하는 역할
     * Methods : HTTP 메서드 허용(GET, POST, ...)
     * Headers : 볼 수 있다? 또는 어느 역할을 허용 한다 정도..?(정확하지 않음)
     * addExposedHeader : 클라이언트에서 헤더 정보를 저장하고 활용할 수 있도록 허락한다.
     * 메인 프로젝트 때에는 클라이언트에서 요구하는 정보가 더 있을 수 있다!
     *
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true); // ??

        configuration.setAllowedOrigins(Arrays.asList("https://ikuzo.s3-website.ap-northeast-2.amazonaws.com",
                "http://ikuzo.s3-website.ap-northeast-2.amazonaws.com",
                "https://web.postman.co",
                "http://localhost:3000",
                "https://localhost:3000")); // * 은 문제 발생

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS")); // OPTIONS?
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");

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

            // JwtVerificationFilter 생성
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // Spring Security Filter Chain 추가
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);

        }
    }

}
