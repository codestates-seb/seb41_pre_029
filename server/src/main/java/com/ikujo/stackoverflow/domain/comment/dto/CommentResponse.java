package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.Member;

import java.time.LocalDateTime;

public record CommentResponse(Long id,
                              String content,
                              Integer recommendCount,
                              Boolean selection,
                              LocalDateTime createdAt,
                              LocalDateTime lastModifiedAt,
                              Member member) {

    public static CommentResponse from(Comment comment) {

        return new CommentResponse(

                comment.getId(),
                comment.getContent(),
                comment.getRecommendCount(),
                comment.getSelection(),
                comment.getCreatedAt(),
                comment.getLastModifiedAt(),
                comment.creator()

        );
    }

}



