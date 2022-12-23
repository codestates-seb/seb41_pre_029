package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

public record MemberResponseDto(

        Long id,
        String email,
        String nickname,
        Profile profile

) {

    public static MemberResponseDto of(Member member) {

        Long id = member.getId();
        String email = member.getEmail();
        String nickname = member.getNickname();
        Profile profile = member.getProfile();

        return new MemberResponseDto(id, email, nickname, profile);
    }

}
