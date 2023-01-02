package com.ikujo.stackoverflow.global.auth.filter;

import com.ikujo.stackoverflow.global.auth.dto.Principal;
import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * JWT 검증 필터
 */
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    /**
     * JWT 토큰 검증 및 SecurityContext에 Authentication 저장하는 메서드
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request); // JWT 검증
            setAuthenticationToContext(claims); // SecurityContext에 Authentication 저장
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);

    }

    /**
     * 특정 조건에 부합하면 동작을 수행하지 않고 건너뛰게 해주는 필터
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        // 요청 헤더 정보 얻기
        String authorization = request.getHeader("Authorization");

        // 요청 헤더가 Bearer로 시작하지 않는다면 Filter 동작을 수행하지 않음.(비회원도 요청할 수 있다면)
        return authorization == null || !authorization.startsWith("Bearer");
    }

    /**
     * 요청에 대한 JWT 검증 메서드
     */
    private Map<String, Object> verifyJws(HttpServletRequest request) {

        // request의 header에서 JWT를 얻음
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        // Secret Key 획득
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // JWT에서 claims가 정상적으로 파싱되면 검증 성공
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }

    /**
     * SecurityContext에 저장하기 위한 메서드
     */
    private void setAuthenticationToContext(Map<String, Object> claims) {

        // username을 얻음
        String email = (String) claims.get("email");

        // 회원 id를 얻음
        Long id = Long.valueOf((Integer) claims.get("id"));

        // 권한 정보를 얻음
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(new Principal(email, id), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}
