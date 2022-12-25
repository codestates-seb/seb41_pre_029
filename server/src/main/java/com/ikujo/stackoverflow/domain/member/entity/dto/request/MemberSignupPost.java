package com.ikujo.stackoverflow.domain.member.entity.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record MemberSignupPost(

        @NotBlank
        @Email
        String email,

        @NotBlank
        String password,

        @NotBlank
        String nickname

) {

    public static MemberSignupPost of(String email, String password, String nickname) {
        return new MemberSignupPost(email, password, nickname);
    }
}
