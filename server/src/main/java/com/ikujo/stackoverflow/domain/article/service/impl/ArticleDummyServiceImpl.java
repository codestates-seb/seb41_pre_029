package com.ikujo.stackoverflow.domain.article.service.impl;

import com.ikujo.stackoverflow.domain.article.dto.response.dummy.ArticleDummyResponseDto;
import com.ikujo.stackoverflow.domain.article.dto.response.dummy.ArticleMultiDummyResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleDummyServiceImpl {

    public List<ArticleMultiDummyResponseDto> findArticles() {
        List<ArticleMultiDummyResponseDto> articleMultiDummyResponseDtoList = new ArrayList<>();

        articleMultiDummyResponseDtoList.add(
                ArticleMultiDummyResponseDto.of(
                        "1쿠조",
                        Long.valueOf(1),
                        Long.valueOf(1),
                        "제목 입니다1".repeat(100),
                        "내용 입니다1".repeat(100),
                        "#third#java#spring#like",
                        1,
                        Long.valueOf(1),
                        true,
                        1
                )
        );

        for (int i = 2; i < 300; i++) {
            articleMultiDummyResponseDtoList.add(
                    ArticleMultiDummyResponseDto.of(
                            i + "쿠조",
                            Long.valueOf(i),
                            Long.valueOf(i),
                            "제목 입니다" + i + ".".repeat(100),
                            "내용 입니다" + i + ".".repeat(100),
                            "#third#java#spring#like",
                            i,
                            Long.valueOf(i),
                            false,
                            i
                    )
            );
        }

        return articleMultiDummyResponseDtoList;
    }

    public ArticleDummyResponseDto findArticle(Long id) {
        if (id == 1L) {
            return createArticle1();
        } else if (id == 2L) {
            return createArticle2();
        } else {
            return createArticle3();
        }
    }

    public ArticleDummyResponseDto createArticle1() {
        return ArticleDummyResponseDto.of(
                "일쿠조",
                1L,
                1L,
                "제목 입니다111",
                "내용 입니다111".repeat(100),
                "#first#java#spring#like",
                1,
                11L
        );
    }

    public ArticleDummyResponseDto createArticle2() {
        return ArticleDummyResponseDto.of(
                "이쿠조",
                2L,
                2L,
                "제목 입니다222",
                "내용 입니다222".repeat(100),
                "#second#java#spring#like",
                2,
                22L
        );
    }

    public ArticleDummyResponseDto createArticle3() {
        return ArticleDummyResponseDto.of(
                "삼쿠조",
                3L,
                3L,
                "제목 입니다333",
                "내용 입니다333".repeat(100),
                "#third#java#spring#like",
                3,
                33L
        );
    }

}
