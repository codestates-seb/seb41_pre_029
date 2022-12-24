package com.ikujo.stackoverflow.domain.article.service;

import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    Page<ArticleResponse> findArticles(Pageable pageable);

    ArticleDetailResponse findArticle(Long articleId);
}
