package com.ikujo.stackoverflow.domain.article.dto.request;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.member.entity.Member;

public record ArticleRequest(
        String title,
        String content,
        String tag
) {

    public static ArticleRequest of(String title, String content, String tag) {
        return new ArticleRequest(title, content, tag);
    }

    public ArticleDto toDto(Member member) {
        return ArticleDto.of(
                member,
                title,
                content,
                tag
        );
    }

    public ArticleDto toDto(Article article) {
        return ArticleDto.of(
                article,
                title,
                content,
                tag
        );
    }

}
