package com.ikujo.stackoverflow.domain.member.entity.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record MemberSignupPost(

        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "잘못된 이메일입니다.")
        String email,

        @NotBlank(message = "비밀번호 입력은 필수입니다.")
        String password,

        @NotBlank(message = "닉네임 입력은 필수입니다.")
        String nickname

) {}
