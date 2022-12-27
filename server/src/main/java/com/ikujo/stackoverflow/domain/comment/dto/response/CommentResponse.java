package com.ikujo.stackoverflow.domain.comment.dto.response;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;

import java.time.LocalDateTime;

public record CommentResponse(Long id,
                              String content,
                              Integer recommendCount,
                              Boolean selection,
                              MemberIdentityDto memberIdentityDto,
                              LocalDateTime createdAt,
                              LocalDateTime lastModifiedAt
) {

    public static CommentResponse of(Long id, String content, Integer recommendCount, Boolean selection,
                                     MemberIdentityDto memberIdentityDto, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        return new CommentResponse(
                id, content, recommendCount, selection, memberIdentityDto, createdAt, lastModifiedAt
        );
    }

    public static CommentResponse from(Comment comment) {

        MemberIdentityDto memberIdentityResponse = MemberIdentityDto.of(comment.getMember().getId(),
                comment.getMember().getProfile().getImage(),
                comment.getMember().getNickname()
        );

        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getRecommendCount(),
                comment.getSelection(),
                memberIdentityResponse,
                comment.getCreatedAt(),
                comment.getLastModifiedAt()
        );
    }

}



