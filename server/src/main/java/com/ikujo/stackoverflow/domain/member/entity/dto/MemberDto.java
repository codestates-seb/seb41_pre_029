package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberLoginPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberProfilePatch;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;

import java.time.LocalDateTime;

public record MemberDto(

        Long id,
        String email,
        String password,
        String nickname,
        Profile profile,
        LocalDateTime createdAt,
        LocalDateTime lastModifiedAt
) {

    public static MemberDto of(MemberLoginPost memberLoginPost) {
        return new MemberDto(
                null,
                memberLoginPost.email(),
                memberLoginPost.password(),
                null,
                null,
                null,
                null);
    }

    public static MemberDto of(MemberSignupPost memberSignupPost) {
        return new MemberDto(
                null,
                memberSignupPost.email(),
                memberSignupPost.password(),
                memberSignupPost.nickname(),
                null,
                LocalDateTime.now(),
                LocalDateTime.now()
                );
    }

    // 리팩토링 필요!
//    public static MemberDto of(Long id, MemberProfilePatch memberProfilePatch) {
//
//        Profile profile = new Profile(memberProfilePatch.location(), memberProfilePatch.title(), memberProfilePatch.aboutMe());
//
//        return new MemberDto(
//                id,
//                null,
//                null,
//                memberProfilePatch.nickname(),
//                profile,
//                null,
//                null
//                );
//    }

    public Member toEntity() {
        return Member.of(
                email,
                password,
                nickname,
                profile
        );
    }
}
