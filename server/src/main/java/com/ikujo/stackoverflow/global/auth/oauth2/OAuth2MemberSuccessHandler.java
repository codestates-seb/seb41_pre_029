//package com.ikujo.stackoverflow.global.auth.oauth2;
//
//import com.ikujo.stackoverflow.domain.member.entity.Member;
//import com.ikujo.stackoverflow.domain.member.service.MemberService;
//import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
//import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.io.IOException;
//import java.net.URI;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RequiredArgsConstructor
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final MemberService memberService;
//
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//
//        var oauth2User = (OAuth2User) authentication.getPrincipal();
//        String email = String.valueOf(oauth2User.getAttributes().get("email"));
//        List<String> authorities = authorityUtils.createRoles(email);
//
//
//    }
//
//    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException {
//
//        String accessToken = delegateAccessToken(member); // OAuth2 Access Token 생성
//        String refreshToken = delegateRefreshToken(member); // OAuth2 Refresh Toekn 새엇ㅇ
//
//        String uri = createURI("Bearer " + accessToken, refreshToken).toString();
//
//        getRedirectStrategy().sendRedirect(request, response, uri);
//    }
//
//    /**
//     * OAuth2 Access Token 생성 메서드
//     */
//    private String delegateAccessToken(Member member) {
//
//        // 인증된 사용자와 관련된 정보 추가
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("email", member.getEmail());
//        claims.put("id", member.getId());
//        claims.put("roles", member.getRoles());
//
//
//        String subject = member.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//    }
//
//    /**
//     * OAuth2 Refresh Toekn 생성 메서드
//     */
//    private String delegateRefreshToken(Member member) {
//        String subject = member.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//    }
//
//    private URI createURI(String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
////                .port(80)
//                .path("/receive-token.html")
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//    }
//}
