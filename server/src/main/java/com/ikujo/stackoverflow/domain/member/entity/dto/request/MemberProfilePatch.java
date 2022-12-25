package com.ikujo.stackoverflow.domain.member.entity.dto.request;

import com.ikujo.stackoverflow.domain.member.entity.Profile;
import jakarta.validation.constraints.NotBlank;

public record MemberProfilePatch(

        @NotBlank
        String nickname,

        String location,

        String title,

        String aboutMe

) {}