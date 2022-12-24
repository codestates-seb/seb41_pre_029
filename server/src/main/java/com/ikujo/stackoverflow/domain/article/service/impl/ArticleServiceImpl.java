package com.ikujo.stackoverflow.domain.article.service.impl;

import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.repository.ArticleDummyRepository;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService {

//    private final ArticleRepository articleRepository;
    private final ArticleDummyRepository articleRepository;

    @Override
    public Page<ArticleResponse> findArticles(Pageable pageable) {
        return articleRepository.findAll(pageable)
                .map(ArticleResponse::from);
    }

    @Override
    public ArticleDetailResponse findArticle(Long articleId) {
        return articleRepository.findById(articleId)
                .map(ArticleDetailResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("게시글이 없습니다 - articleId: " + articleId));
    }

}
