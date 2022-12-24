package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;

import java.time.LocalDateTime;
import java.util.List;

public record CommentDto(Long id,
                         Article article,
                         Member member,
                         String content,
                         Boolean selection,
                         Integer recommendCount,
                         List<CommentRecommend> commentRecommendList,
                         LocalDateTime createdAt,
                         LocalDateTime lastModifiedAt) {

    public static CommentDto of(CommentPost commentPost) {
        return new CommentDto(null, null, null, commentPost.content(), null,
                null, null, null, null);
    }

    public Comment toEntity() {
        return Comment.of(
                article,
                member,
                content,
                selection,
                recommendCount,
                commentRecommendList
        );
    }

    public static CommentDto from(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getArticle(),
                comment.getMember(),
                comment.getContent(),
                comment.getSelection(),
                comment.getRecommendCount(),
                comment.getCommentRecommendList(),
                comment.getCreatedAt(),
                comment.getLastModifiedAt());
    }
}
