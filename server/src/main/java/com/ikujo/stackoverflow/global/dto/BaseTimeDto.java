package com.ikujo.stackoverflow.global.dto;

import java.time.LocalDateTime;

public record BaseTimeDto(
        LocalDateTime createdAt,
        LocalDateTime lastModifiedAt
) {

    public static BaseTimeDto of(LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        return new BaseTimeDto(createdAt, lastModifiedAt);
    }
}
