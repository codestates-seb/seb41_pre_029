package com.ikujo.stackoverflow.domain.comment.dto.response;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;

public record CommentRecommendResponse(Long id,
                                       Integer RecommendCount) {

    public static CommentRecommendResponse from(CommentRecommend commentRecommend) {

        Integer recommendCount = commentRecommend.getComment().getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentRecommendResponse(commentRecommend.getId(), recommendCount);
    }

    public static CommentRecommendResponse from(Comment comment) {

        Integer recommendCount = comment.getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentRecommendResponse(null, recommendCount);
    }

}
