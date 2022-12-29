package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentSelection;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.Member;

import java.time.LocalDateTime;
public record CommentDto(Long id,
                         Article article,
                         Member member,
                         String content,
                         Boolean selection,
                         LocalDateTime createdAt,
                         LocalDateTime lastModifiedAt) {

    public static CommentDto of(CommentPost commentPost, Article article, Member member) {


        return new CommentDto(null ,article, member, commentPost.content(), false,
                null, null);
    }

    public static CommentDto of(Comment comment, CommentPatch commentPatch) {
        return new CommentDto(comment.getId(), comment.getArticle(), comment.getMember(), commentPatch.content(),
               comment.getSelection() , comment.getCreatedAt(), null);
    }

    public static CommentDto of(Comment comment, CommentSelection commentSelection) {
        return new CommentDto(comment.getId(), comment.getArticle(), comment.getMember(), comment.getContent(),
                commentSelection.selection(), comment.getCreatedAt(), null);
    }

    public Comment toEntity() {
        return Comment.of(
                id,
                article,
                member,
                content,
                selection
        );

    }
}
