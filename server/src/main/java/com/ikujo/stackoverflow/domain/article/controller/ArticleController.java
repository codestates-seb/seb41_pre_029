package com.ikujo.stackoverflow.domain.article.controller;

import com.ikujo.stackoverflow.domain.article.dto.response.dummy.ArticleDummyResponseDto;
import com.ikujo.stackoverflow.domain.article.dto.response.dummy.ArticleMultiDummyResponseDto;
import com.ikujo.stackoverflow.domain.article.service.impl.ArticleDummyServiceImpl;
import com.ikujo.stackoverflow.global.dto.MultiResponseDto;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class ArticleController {

//    private final ArticleService articleService;
    private final ArticleDummyServiceImpl articleService;

    @GetMapping
    public ResponseEntity getQuestions(@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ArticleMultiDummyResponseDto> articleMultiDummyResponseDtoList = articleService.findArticles();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), articleMultiDummyResponseDtoList.size());

        Page page = new PageImpl(articleMultiDummyResponseDtoList.subList(start, end), pageable, 300);

        return new ResponseEntity<>(
                new MultiResponseDto<>(page.getContent(), page),
                HttpStatus.OK);
    }

    @GetMapping("{article-id}")
    public ResponseEntity getQuestion(@PathVariable("article-id") Long articleId) {

        ArticleDummyResponseDto article = articleService.findArticle(articleId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(article),
                HttpStatus.OK);
    }

}
