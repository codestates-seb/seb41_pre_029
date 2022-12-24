package com.ikujo.stackoverflow.domain.article.repository;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Repository
public class ArticleDummyRepository {

    public Page<Article> findAll(Pageable pageable) {
        List<Article> articles = createArticles();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), articles.size());

        return new PageImpl(articles.subList(start, end), pageable, 300);
    }

    public Optional<Article> findById(Long articleId) {
        return Optional.of(createArticle(articleId));
    }

    private Article createArticle(Long articleId) {
        return new Article(
                articleId,
                new Member(articleId,
                        articleId + "@gmail.com",
                        "1234",
                        "김회원",
                        new Profile("대한민국", "안녕하세요", "김회원입니다~")),
                "제목입니다.",
                "내용입니다.",
                "#Java#Kurt#Guihub",
                articleId,
                null,
                null
        );
    }

    private List<Article> createArticles() {
        List<Article> articles = new ArrayList<>();

        articles.add(
                new Article(
                        1L,
                        new Member(1L,
                                "aaa@gmail.com",
                                "1234",
                                "김회원",
                                new Profile("대한민국", "안녕하세요", "김회원입니다~")),
                        "제목입니다.",
                        "내용입니다.",
                        "#Java#Kurt#Guihub",
                        1L,
                        null,
                        null
                )
        );

        for (int i = 2; i < 300; i++) {
            articles.add(
                    new Article(
                            (long) i,
                            new Member(1L,
                                    "aaa@gmail.com",
                                    "1234",
                                    "김회원",
                                    new Profile("대한민국", "안녕하세요", "김회원입니다~")),
                            i + "제목입니다.",
                            i + "내용입니다.",
                            "#Java#Kurt#Guihub",
                            (long) i,
                            null,
                            null
                    )
            );
        }

        return articles;
    }

}
