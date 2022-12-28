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
    private final ArticleRecommendService articleRecommendService;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping
    public ResponseEntity getQuestions(@PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ArticleResponse> articleResponsePage = articleService.findArticles(pageable);

        return new ResponseEntity<>(
                new MultiResponseDto(articleResponsePage.getContent(), articleResponsePage),
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
    public ResponseEntity postArticle(@RequestHeader(name = "Authorization") String token, // Long memberId,
                                      @RequestBody @Valid ArticleRequest articlePost) {
        // FIXME : 회원 아이디를 어떻게 받을지 결정되면 이 부분만 수정하면 된다.
        Long id = jwtTokenizer.tokenToMemberId(token); // Long memberId = 1L;

        ArticleDto articleDto = articleService.saveArticle(articlePost, id);

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
    public ResponseEntity articlePickedLike(@Positive @PathVariable("article-id") Long articleId) {
        // FIXME : 회원 아이디를 어떻게 받을지 결정되면 이 부분만 수정하면 된다.
        Long memberId = 1L;
        articleRecommendService.pickedLike(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("{article-id}/unlikes")
    public ResponseEntity articlePickedUnlike(@Positive @PathVariable("article-id") Long articleId) {
        // FIXME : 회원 아이디를 어떻게 받을지 결정되면 이 부분만 수정하면 된다.
        Long memberId = 1L;
        articleRecommendService.pickedUnlike(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
