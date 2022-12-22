package com.ikujo.stackoverflow.global.dto;

public record SingleResponseDto<T>(
        T data
) {
    public SingleResponseDto of(T data) {
        return new SingleResponseDto(data);
    }
}
