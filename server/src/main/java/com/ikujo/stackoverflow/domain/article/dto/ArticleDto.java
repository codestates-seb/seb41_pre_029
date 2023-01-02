package com.ikujo.stackoverflow.domain.article.dto;

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

    public static ArticleDto of(Member member, String title, String content, String tag) {
        return new ArticleDto(null, member, title, content, tag, null, null, null);
    }

    public static ArticleDto of(Article article, String title, String content, String tag) {
        return new ArticleDto(article.getId(), article.getMember(), title, content, tag, article.getId(), article.getCreatedAt(), null);
    }

    public static ArticleDto from(Article article){
        return new ArticleDto(
                article.getId(),
                article.getMember(),
                article.getTitle(),
                article.getContent(),
                article.getTag(),
                article.getHits(),
                article.getCreatedAt(),
                article.getLastModifiedAt()
        );
    }

    public Article toEntity() {
        return Article.of(
                id,
                member,
                title,
                content,
                tag,
                hits
        );
    }

}
