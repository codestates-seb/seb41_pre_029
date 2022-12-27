package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
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

    public static CommentDto of(CommentPost commentPost, Article article, Member member) {
        return new CommentDto(null, article, member, commentPost.content(), null,
                null, null, LocalDateTime.now(), LocalDateTime.now());
    }

    public static CommentDto of(Comment comment, CommentPatch commentPatch, Article article, Member member) {
        return new CommentDto(comment.getId(), article, member, commentPatch.content(), comment.getSelection(),
                comment.getRecommendCount(), comment.getCommentRecommendList(), comment.getCreatedAt(), LocalDateTime.now());
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
}
