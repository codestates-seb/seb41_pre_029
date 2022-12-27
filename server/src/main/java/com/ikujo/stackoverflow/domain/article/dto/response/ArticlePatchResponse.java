package com.ikujo.stackoverflow.domain.article.dto.response;

import com.ikujo.stackoverflow.domain.article.entity.Article;

import java.util.List;

import static com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse.tagSplit;

public record ArticlePatchResponse(
        String title,
        String content,
        List<String> tag
) {
    public static ArticlePatchResponse from(Article article) {
        List<String> tags = tagSplit(article.getTag());

        return new ArticlePatchResponse(
                article.getTitle(),
                article.getContent(),
                tags
        );
    }

    public static ArticlePatchResponse of(String title, String content, List<String> tag) {
        return new ArticlePatchResponse(
                title,
                content,
                tag);
    }
}
