package com.ikujo.stackoverflow.global.auth.handler;

import com.google.gson.Gson;
import com.ikujo.stackoverflow.global.exception.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

/**
 * 인증 실패시 작업 핸들러
 */
@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        log.error("인증 실패 : {}", exception.getMessage());

        sendErrorResponse(response);
    }

    /**
     * Error 정보
     */
    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        Gson gson = new Gson();

        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
