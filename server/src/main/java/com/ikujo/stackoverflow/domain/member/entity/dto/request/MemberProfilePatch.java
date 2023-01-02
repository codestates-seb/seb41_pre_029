package com.ikujo.stackoverflow.domain.member.entity.dto.request;

import jakarta.validation.constraints.NotBlank;

public record MemberProfilePatch(

        @NotBlank
        String nickname,

        String image,

        String location,

        String title,

        String aboutMe,

        String website,

        String twitter,

        String github

) {}
