package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;

public record MemberDummyDto(Long id,
                             String nickName) {

    public static MemberDummyDto of(Member member) {
        return new MemberDummyDto(member.getId(), member.getNickname());
    }
}
