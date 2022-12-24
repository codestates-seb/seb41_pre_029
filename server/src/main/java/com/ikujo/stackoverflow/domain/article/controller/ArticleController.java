package com.ikujo.stackoverflow.domain.article.controller;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRequest;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import com.ikujo.stackoverflow.global.dto.MultiResponseDto;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity getQuestion(@Positive @PathVariable("article-id") Long articleId) {
        ArticleDetailResponse articleDetailDto = articleService.findArticle(articleId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(articleDetailDto),
                HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity postNewArticle(@Valid @RequestBody ArticleRequest articlePost) {
        // FIXME : 회원 아이디를 어떻게 받을지 결정되면 이 부분만 수정하면 된다.
        Long memberId = 1L ;
        ArticleDto articleDto = articleService.saveArticle(articlePost, memberId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(articleDto),
                HttpStatus.CREATED);
    }

    @DeleteMapping("{article-id}")
    public ResponseEntity deleteArticle(@Positive @PathVariable("article-id") Long articleId) {
        articleService.deleteArticle(articleId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
