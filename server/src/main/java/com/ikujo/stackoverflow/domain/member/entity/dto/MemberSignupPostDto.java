package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;

public record MemberSignupPostDto(
        String email,
        String password,
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
