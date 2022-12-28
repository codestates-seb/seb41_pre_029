package com.ikujo.stackoverflow.domain.comment.dto.response;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;

public record CommentRecommendResponse(Long id,
                                       Long RecommendCount) {

    public static CommentRecommendResponse from(CommentRecommend commentRecommend) {

        Long recommendCount = commentRecommend.getComment().getCommentRecommendList().stream()
                .map(CommentRecommend::getFlag)
                .count();

        return new CommentRecommendResponse(commentRecommend.getId(), recommendCount);
    }

    public static CommentRecommendResponse from(Comment comment) {

        Long recommendCount = comment.getCommentRecommendList().stream()
                .map(CommentRecommend::getFlag)
                .count();

        return new CommentRecommendResponse(null, recommendCount);
    }

}
