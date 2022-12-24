package com.ikujo.stackoverflow.domain.article.controller;

import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import com.ikujo.stackoverflow.global.dto.MultiResponseDto;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity getQuestions(@PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ArticleResponse> articleResponsePage = articleService.findArticles(pageable);

        return new ResponseEntity<>(
                new MultiResponseDto (articleResponsePage.getContent(), articleResponsePage),
                HttpStatus.OK);
    }

    @GetMapping("{article-id}")
    public ResponseEntity getQuestion(@PathVariable("article-id") Long articleId) {
        ArticleDetailResponse articleDetailDto = articleService.findArticle(articleId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(articleDetailDto),
                HttpStatus.OK);
    }

}
