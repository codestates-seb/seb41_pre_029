package com.ikujo.stackoverflow.domain.member.entity.dto.response;

import com.ikujo.stackoverflow.domain.member.entity.Link;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

import java.time.LocalDateTime;

public record MemberResponse(

        Long memberId,

        String email,

        String nickname,

        Profile profile,

        Link link,

        LocalDateTime createdAt,

        LocalDateTime lastModifiedAt

) {

    public static MemberResponse of(Long id,
                                    String email,
                                    String nickname,
                                    Profile profile,
                                    Link link,
                                    LocalDateTime createdAt,
                                    LocalDateTime lastModifiedAt) {

        return new MemberResponse(id, email, nickname, profile, link, createdAt, lastModifiedAt);
    }


    public static MemberResponse from(Member member) {

        Long id = member.getId();
        String email = member.getEmail();
        String nickname = member.getNickname();
        Profile profile = member.getProfile();
        Link link = member.getLink();
        LocalDateTime createdAt = member.getCreatedAt();
        LocalDateTime lastModifiedAt = member.getLastModifiedAt();

        return new MemberResponse(id, email, nickname, profile, link, createdAt, lastModifiedAt);
    }
}
