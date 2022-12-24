package com.ikujo.stackoverflow.domain.member.entity.dto;

import lombok.Builder;

@Builder
public record MemberIdentityDto(
        Long id,
        String nickname
) {

    public static MemberIdentityDto of(Long id, String nickname){
        return new MemberIdentityDto(id, nickname);
    }

}
