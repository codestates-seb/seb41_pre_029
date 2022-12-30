package com.ikujo.stackoverflow.domain.article.repository.querydsl;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {

    Page<Article> findAllSearch(String searchValue, Pageable pageable);

}
