package com.ikujo.stackoverflow.domain.article.repository.querydsl;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.entity.QArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;


public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {

    public ArticleRepositoryCustomImpl() {
        super(Article.class);
    }

    // select * from article where (title || content || tag) like '%leo%';
    @Override
    public Page<Article> findAllSearch(String searchValue, Pageable pageable) {
        QArticle a = QArticle.article;

        List<Article> articles = from(a)
                .select(a)
                .where(a.title.containsIgnoreCase(searchValue)
                        .or(a.content.containsIgnoreCase(searchValue))
                        .or(a.tag.containsIgnoreCase(searchValue)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = from(a)
                .select(a.count())
                .where(a.title.containsIgnoreCase(searchValue)
                        .or(a.content.containsIgnoreCase(searchValue))
                        .or(a.tag.containsIgnoreCase(searchValue)))
                .fetchOne();

        return new PageImpl<>(articles, pageable, count);
    }

}
