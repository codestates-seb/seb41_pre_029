package com.ikujo.stackoverflow.domain.member.entity.dto.response;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

public record MemberResponse(

        Long id,

        String email,

        String nickname,

        Profile profile

) {

    public static MemberResponse of(Member member) {

        Long id = member.getId();
        String email = member.getEmail();
        String nickname = member.getNickname();
        Profile profile = member.getProfile();

        return new MemberResponse(id, email, nickname, profile);
    }

}
