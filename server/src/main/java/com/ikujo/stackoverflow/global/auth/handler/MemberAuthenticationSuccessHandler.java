package com.ikujo.stackoverflow.global.auth.handler;

import com.google.gson.Gson;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.auth.dto.Principal;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

/**
 * 성공 시 추가 작업을 할 수 있는 핸들러
 */
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Gson gson = new Gson();
        Member member = (Member) authentication.getPrincipal();

        Principal principal = new Principal(member.getEmail(), member.getId());
        String s = gson.toJson(principal);

        response.setContentType("application/json");
        response.getWriter().write(s);

        log.info("로그인 인증 성공");
    }
}
