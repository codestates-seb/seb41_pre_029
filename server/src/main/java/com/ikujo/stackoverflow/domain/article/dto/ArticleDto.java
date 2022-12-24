package com.ikujo.stackoverflow.domain.article.dto;

import com.ikujo.stackoverflow.domain.article.dto.request.ArticlePatch;
import com.ikujo.stackoverflow.domain.article.dto.request.ArticlePost;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.member.entity.Member;

import java.time.LocalDateTime;

public record ArticleDto(
        Long id,
        Member member,
        String title,
        String content,
        String tag,
        Long hits,
        LocalDateTime createdAt,
        LocalDateTime lastModifiedAt
) {

    public ArticleDto of(ArticlePost articlePost, Member member) {
        return new ArticleDto(null, member, articlePost.title(), articlePost.content(), articlePost.tag(),
                null, null, null);
    }

    public ArticleDto of(ArticlePatch articlepatch, Member member) {
        return new ArticleDto(null, member, articlepatch.title(), articlepatch.content(), articlepatch.tag(),
                null, null, null);
    }

    public Article toEntity() {
        return Article.of(
                member,
                title,
                content,
                tag,
                hits
        );
    }

}
