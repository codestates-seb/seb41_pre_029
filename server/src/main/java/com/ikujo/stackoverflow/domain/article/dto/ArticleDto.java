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
                member,
                title,
                content,
                tag,
                hits
        );
    }

}
