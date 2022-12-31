package com.ikujo.stackoverflow.domain.comment.dto.response;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;

public record CommentRecommendResponse(String currentState,
                                       Integer RecommendCount) {

    public static CommentRecommendResponse fromLike(CommentRecommend commentRecommend) {

        Integer recommendCount = commentRecommend.getComment().getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentRecommendResponse("like" ,recommendCount);
    }

    public static CommentRecommendResponse fromUnlike(CommentRecommend commentRecommend) {

        Integer recommendCount = commentRecommend.getComment().getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentRecommendResponse("unlike", recommendCount);
    }

    public static CommentRecommendResponse from(Comment comment) {

        Integer recommendCount = comment.getCommentRecommendList().stream()
                .mapToInt(CommentRecommend::getFlag)
                .sum();

        return new CommentRecommendResponse("nothing" ,recommendCount);
    }

}
