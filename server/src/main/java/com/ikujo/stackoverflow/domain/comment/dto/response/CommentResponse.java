package com.ikujo.stackoverflow.domain.comment.dto.response;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;

import java.time.LocalDateTime;

public record CommentResponse(Long id,
                              String content,
                              Integer recommendCount,
                              Boolean selection,
                              MemberIdentityDto member,
                              LocalDateTime createdAt,
                              LocalDateTime lastModifiedAt
) {

    public static CommentResponse of(Long id, String content, Integer recommendCount, Boolean selection,
                                     MemberIdentityDto member, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        return new CommentResponse(
                id, content, recommendCount, selection, member, createdAt, lastModifiedAt
        );
    }

    public static CommentResponse from(Comment comment) {

        MemberIdentityDto member = MemberIdentityDto.of(comment.getMember().getId(),
                comment.getMember().getProfile().getImage(),
                comment.getMember().getNickname()
        );

        Integer recommendCount = comment.getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                recommendCount,
                comment.getSelection(),
                member,
                comment.getCreatedAt(),
                comment.getLastModifiedAt()
        );
    }

}



