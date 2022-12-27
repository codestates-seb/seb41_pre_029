package com.ikujo.stackoverflow.domain.article.repository;

import com.ikujo.stackoverflow.domain.article.entity.ArticleRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRecommendRepository extends JpaRepository<ArticleRecommend, Long> {

    List<ArticleRecommend> findAllByArticleId(Long ArticleId);

}