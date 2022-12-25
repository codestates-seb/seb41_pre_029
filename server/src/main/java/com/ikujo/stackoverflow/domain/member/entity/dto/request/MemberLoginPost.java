package com.ikujo.stackoverflow.domain.member.entity.dto.request;

import jakarta.validation.constraints.NotBlank;

public record MemberLoginPost(

        @NotBlank
        String email,

        @NotBlank
        String password

) {

    public static MemberLoginPost of(String email, String password) {
        return new MemberLoginPost(email, password);
    }
}
