package com.ikujo.stackoverflow.domain.member.entity.dto;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import jakarta.validation.constraints.NotBlank;

public record MemberProfilePatchDto(

        @NotBlank
        String nickname,
        Profile profile

) {

    public static MemberProfilePatchDto of(String nickname, String location, String title, String aboutMe) {

        Profile profile = new Profile(location, title, aboutMe);

        return new MemberProfilePatchDto(nickname, profile);
    }

    public Member toEntity() {
        return Member.of(
                nickname(),
                profile()
        );
    }

}
