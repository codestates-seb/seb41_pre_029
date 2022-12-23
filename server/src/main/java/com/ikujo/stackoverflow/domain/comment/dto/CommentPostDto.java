package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;

public record CommentPostDto(String comment) {

    public static CommentPostDto of(String comment) {
        return new CommentPostDto(comment);
    }
}
