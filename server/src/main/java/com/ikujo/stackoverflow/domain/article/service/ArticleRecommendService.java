package com.ikujo.stackoverflow.domain.article.service;

public interface ArticleRecommendService {

    void pickedLike(Long articleId, Long memberId);

    void pickedUnlike(Long articleId, Long memberId);

}
