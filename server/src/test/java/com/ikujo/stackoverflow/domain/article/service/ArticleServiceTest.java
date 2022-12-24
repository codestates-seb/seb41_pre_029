package com.ikujo.stackoverflow.domain.article.service;

import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.article.service.impl.ArticleServiceImpl;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@DisplayName("비즈니스 로직 - 게시글")
@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @InjectMocks
    private ArticleServiceImpl articleService;
    @Mock
    private ArticleRepository articleRepository;

    @DisplayName("게시판 조회하면, 게시글 페이지를 반환한다.")
    @Test
    void findArticles() {
        //given
        Pageable pageable = Pageable.ofSize(20);
        given(articleRepository.findAll(pageable))
                .willReturn(Page.empty());

        //when
        Page<ArticleResponse> articles = articleService.findArticles(pageable);

        //then
        assertThat(articles).isEmpty();
        then(articleRepository).should().findAll(pageable);
    }

    @DisplayName("게시글을 누르면 해당 게시글을 반환한다.")
    @Test
    void findArticle() {
        //given
        Long articleId = 1L;
        Article article = createArticle();

        given(articleRepository.findById(articleId))
                .willReturn(Optional.of(article));

        //when
        ArticleDetailResponse articleDetailResponse = articleService.findArticle(articleId);

        //then
        assertThat(articleDetailResponse)
                .hasFieldOrPropertyWithValue("title", article.getTitle())
                .hasFieldOrPropertyWithValue("content", article.getContent());
        then(articleRepository).should().findById(articleId);
    }

    private Article createArticle() {
        return Article.of(
                new Member(1L,
                         "test@gmail.com",
                        "1234",
                        "테스트",
                        new Profile("대한민국", "안녕하세요", "테스트입니다~")),
                "테스트 제목",
                "테스트 내용",
                "#Java#Stack#Over#flow",
                1L
        );
    }

}
