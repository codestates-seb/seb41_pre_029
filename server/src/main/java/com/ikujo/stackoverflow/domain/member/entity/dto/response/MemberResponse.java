package com.ikujo.stackoverflow.domain.member.entity.dto.response;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

import java.time.LocalDateTime;

public record MemberResponse(

        Long id,

        String email,

        String nickname,

        Profile profile,

        LocalDateTime createdAt,

        LocalDateTime lastModifiedAt

) {

    public static MemberResponse of(Member member) {

        Long id = member.getId();
        String email = member.getEmail();
        String nickname = member.getNickname();
        Profile profile = member.getProfile();
        LocalDateTime createdAt = member.getCreatedAt();
        LocalDateTime lastModifiedAt = member.getLastModifiedAt();

        return new MemberResponse(id, email, nickname, profile, createdAt, lastModifiedAt);
    }

}
