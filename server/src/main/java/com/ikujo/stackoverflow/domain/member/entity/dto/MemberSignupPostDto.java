package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record MemberSignupPostDto(
        @NotBlank
        @Email
        String email,

        @NotBlank
        String password,

        @NotBlank
        String nickname
) {

    public static MemberSignupPostDto of(String email, String password, String nickname) {
        return new MemberSignupPostDto(email, password, nickname);
    }

    public Member toEntity() {
        return Member.of(
                email(),
                password(),
                nickname()
        );
    }

}
