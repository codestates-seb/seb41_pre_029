package com.ikujo.stackoverflow.global.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record MultiResponseDto<T>(
        List<T> data,
        PageInfo pageInfo
) {
    public static MultiResponseDto of(List data, Page page) {
        return new MultiResponseDto<>(data, PageInfo.of(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages()));
    }
}