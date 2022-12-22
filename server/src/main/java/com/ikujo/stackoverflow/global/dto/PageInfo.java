package com.ikujo.stackoverflow.global.dto;

public record PageInfo(
        Integer page,
        Integer size,
        Long totalElements,
        Integer totalPages) {

    public static PageInfo of(Integer page, Integer size, Long totalElements, Integer totalPages) {
        return new PageInfo(page, size, totalElements, totalPages);
    }
}
