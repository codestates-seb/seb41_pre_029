package com.ikujo.stackoverflow.domain.article.controller;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRequest;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticlePatchResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.service.ArticleRecommendService;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
import com.ikujo.stackoverflow.global.dto.MultiResponseDto;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleRecommendService articleRecommendService;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(required = false) String searchValue,
                                       @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ArticleResponse> articleResponsePage = articleService.searchArticles(searchValue, pageable);

        return new ResponseEntity<>(
                new MultiResponseDto(articleResponsePage.getContent(), articleResponsePage),
                HttpStatus.OK);
    }

    @GetMapping("{article-id}")
    public ResponseEntity getQuestion(@RequestHeader(name = "Authorization", required = false) String token,
                                      @Positive @PathVariable("article-id") Long articleId) {
        ArticleDetailResponse articleDetailDto = articleService.findArticle(articleId, token);

        return new ResponseEntity<>(
                new SingleResponseDto<>(articleDetailDto),
                HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity postArticle(@RequestHeader(name = "Authorization") String token,
                                      @RequestBody @Valid ArticleRequest articlePost) {
        Long memberId = jwtTokenizer.tokenToMemberId(token);

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

    @PatchMapping("{article-id}")
    public ResponseEntity patchArticle(@Positive @PathVariable("article-id") Long articleId,
                                       @RequestBody @Valid ArticleRequest articleRequest) {
        articleService.patchArticle(articleId, articleRequest);

        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }

    @GetMapping("{article-id}/edit")
    public ResponseEntity patchGetArticle(@Positive @PathVariable("article-id") Long articleId) {
        ArticlePatchResponse articlePatchResponse = articleService.patchFindArticle(articleId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(articlePatchResponse),
                HttpStatus.OK);
    }

    @PostMapping("{article-id}/likes")
    public ResponseEntity articlePickedLike(@RequestHeader(name = "Authorization") String token,
                                            @Positive @PathVariable("article-id") Long articleId) {
        Long memberId = jwtTokenizer.tokenToMemberId(token);
        articleRecommendService.pickedLike(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("{article-id}/unlikes")
    public ResponseEntity articlePickedUnlike(@RequestHeader(name = "Authorization") String token,
                                              @Positive @PathVariable("article-id") Long articleId) {
        Long memberId = jwtTokenizer.tokenToMemberId(token);
        articleRecommendService.pickedUnlike(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
