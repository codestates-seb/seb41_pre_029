package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.dto.request.CommentRecommendPost;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;

public record CommentRecommendDto(Long id,
                                  Member member,
                                  Comment comment,
                                  Integer flag) {

    public static CommentRecommendDto of(Member member, Comment comment, CommentRecommendPost commentRecommendPost) {
        return new CommentRecommendDto(null, member, comment, commentRecommendPost.flag());
    }

    public CommentRecommend toEntity() {
        return CommentRecommend.of(
                member,
                comment,
                flag
        );
    }

}
