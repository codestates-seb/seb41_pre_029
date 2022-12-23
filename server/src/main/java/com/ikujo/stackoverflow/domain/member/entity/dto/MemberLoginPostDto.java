package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import jakarta.validation.constraints.NotBlank;

public record MemberLoginPostDto(

        @NotBlank
        String email,
        @NotBlank
        String password
) {

    public static MemberLoginPostDto of(String email, String password) {
        return new MemberLoginPostDto(email, password);
    }

    public Member toEntity() {
        return Member.of(
                email(),
                password()
        );
    }

}

