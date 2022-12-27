package com.ikujo.stackoverflow.global.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 인증을 시도하는 메서드
     */
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper(); // Username, Password를 역직렬화하기 위한 ObjectMapper
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // LoginDto 클래스로 역직렬화

        // Username과 Password 정보를 포함한 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // AuthenticationManager에게 인증 위임
        return authenticationManager.authenticate(authenticationToken);
    }

    /**
     * 인증에 성공할 경우 호출되는 메서드
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {

        Member member = (Member) authResult.getPrincipal(); // Member 엔티티 객체 얻기

        String accessToken = delegateAccessToken(member); // Access Token 생성
        String refreshToken = delegateRefreshToken(member); // Refresh Token 생성

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    /**
     * Access Token 생성 메서드
     */
    private String delegateAccessToken(Member member) {

        // 인증된 사용자와 관련된 정보 추가
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("id", member.getId());

        String subject = member.getEmail(); // JWT 제목
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes()); // 토큰 발행 일자
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // Secret Key 문자열 인코딩

        // Access Token 생성
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    /**
     * Refresh Token 생성 메서드
     */
    private String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // Refresh Token 생성
        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

}
