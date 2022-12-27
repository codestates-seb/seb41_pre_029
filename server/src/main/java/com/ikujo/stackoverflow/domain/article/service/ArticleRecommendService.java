package com.ikujo.stackoverflow.domain.article.service;

import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRecommendRequest;

public interface ArticleRecommendService {

    void pickedLike(Long articleId, Long memberId);

    void pickedUnlike(Long articleId, Long memberId);

}
