package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;

public record CommentRecommendDto(Long id,
                                  Member member,
                                  Comment comment,
                                  Integer flag) {

    public static CommentRecommendDto of(Long id, Member member, Comment comment, Integer flag) {
        return new CommentRecommendDto(id, member, comment, flag);
    }

    public CommentRecommend toEntity() {
        return CommentRecommend.of(
                member,
                comment,
                flag
        );
    }

    public static CommentRecommendDto from(CommentRecommend commentRecommend) {
        return new CommentRecommendDto(
                commentRecommend.getId(),
                commentRecommend.getMember(),
                commentRecommend.getComment(),
                commentRecommend.getFlag());
    }

}
