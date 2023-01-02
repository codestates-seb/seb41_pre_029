package com.ikujo.stackoverflow.domain.comment.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class CommentMultiResponseDto<T> {

    private List<T> data;

    private int size;

    public CommentMultiResponseDto(int size, List<T> data) {
        this.data = data;
        this.size = size;
    }
}
