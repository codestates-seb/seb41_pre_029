package com.ikujo.stackoverflow.domain.article.service;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRequest;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.article.service.impl.ArticleServiceImpl;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Disabled;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;

@DisplayName("비즈니스 로직 - 게시글")
@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @InjectMocks
    private ArticleServiceImpl articleService;
    @Mock
    private ArticleRepository articleRepository;
    @Mock
    private MemberRepository memberRepository;

    @DisplayName("게시판 조회하면, 게시글 페이지를 반환한다.")
    @Test
    void findArticles() {
        //given
        Pageable pageable = Pageable.ofSize(20);
        given(articleRepository.findAll(pageable))
                .willReturn(Page.empty());

        //when
        Page<ArticleResponse> actual = articleService.findArticles(pageable);

        //then
        assertThat(actual).isEmpty();
        then(articleRepository).should().findAll(pageable);
    }

    @DisplayName("게시글을 누르면, 해당 게시글을 반환한다.")
    @Test
    void findArticle() {
        //given
        Long articleId = 1L;
        Article article = createArticle();

        given(articleRepository.findById(articleId))
                .willReturn(Optional.of(article));

        //when
        ArticleDetailResponse actual = articleService.findArticle(articleId);

        //then
        assertThat(actual)
                .hasFieldOrPropertyWithValue("title", article.getTitle())
                .hasFieldOrPropertyWithValue("content", article.getContent());
        then(articleRepository).should().findById(articleId);
    }

    @DisplayName("새게시글을 작성하면, 작성된 게시글을 반환한다.")
    @Test
    void saveArticle() {
        //given
        Long articleId = 1L;
        ArticleRequest articleRequest = createArticleRequest();
        Article article = createArticle();
        Member member = createMember();

        given(memberRepository.getReferenceById(articleId))
                .willReturn(member);
        given(articleRepository.save(any(Article.class)))
                .willReturn(article);

        //when
        ArticleDto actual = articleService.saveArticle(articleRequest, articleId);

        //then
        assertThat(actual)
                .hasFieldOrPropertyWithValue("title", article.getTitle())
                .hasFieldOrPropertyWithValue("content", article.getContent());
        then(memberRepository).should().getReferenceById(articleId);
    }

    @Disabled("현재 이 테스트는 DB에 삭제할 게시글이 없어 에러를 발생한다.")
    @DisplayName("게시글 아이디를 받아 해당 게시글을 삭제하면, 삭제 로그만 남기고 아무것도 반환하지 않는다.")
    @Test
    void deleteArticle() {
        //given
        Long articleId = 1L;
        willDoNothing().given(articleRepository).deleteById(articleId);

        //when
        articleService.deleteArticle(1L);

        //then
        then(articleRepository).should().deleteById(articleId);
    }

    private Article createArticle() {
        return Article.of(
                createMember(),
                "테스트 제목",
                "테스트 내용",
                "#Java#Stack#Over#flow",
                1L
        );
    }

    private Member createMember(){
        return new Member(1L,
                "test@gmail.com",
                "1234",
                "테스트",
                new Profile("대한민국", "안녕하세요", "테스트입니다~"));
    }

    private ArticleRequest createArticleRequest() {
        return ArticleRequest.of(
                "test title",
                "test content",
                "#Java#Stack#Over#flow"
        );
    }

}
