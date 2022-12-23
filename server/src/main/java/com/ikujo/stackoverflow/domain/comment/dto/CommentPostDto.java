package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;

public record CommentPostDto(String content) {

    public static CommentPostDto of(String content) {
        return new CommentPostDto(content);
    }

    public Comment toEntity() {
        return Comment.of(content());
    }
}
