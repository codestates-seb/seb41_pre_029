package com.ikujo.stackoverflow.domain.article.service.impl;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRequest;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticlePatchResponse;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    //    private final ArticleDummyRepository articleRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    @Override
    public Page<ArticleResponse> findArticles(Pageable pageable) {
        return articleRepository.findAll(pageable)
                .map(ArticleResponse::from);
    }

    @Override
    public ArticleDetailResponse findArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 게시글 입니다. articleId : " + articleId));
        article.visitCount();

        return ArticleDetailResponse.from(article);
    }

    @Override
    public ArticleDto saveArticle(ArticleRequest articleRequest, Long memberId) {
        Member member = memberRepository.getReferenceById(memberId);
        Article article = articleRepository.save(articleRequest.toDto(member).toEntity());

        return ArticleDto.from(article);
    }

    @Override
    public void deleteArticle(Long articleId) {
        verifyExistArticle(articleId);
        articleRepository.deleteById(articleId);

        log.info("삭제한 게시글 번호 : {}", articleId);
    }

    @Override
    public void patchArticle(Long articleId, ArticleRequest articleRequest) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 게시글 입니다. articleId : " + articleId));

        articleRepository.save(articleRequest.toDto(article).toEntity());
    }

    @Override
    public ArticlePatchResponse patchFindArticle(Long articleId) {
        return articleRepository.findById(articleId)
                .map(ArticlePatchResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 게시글 입니다. articleId : " + articleId));
    }

    private void verifyExistArticle(Long articleId) {
        if (articleRepository.findById(articleId).isEmpty()) {
            throw new EntityNotFoundException("존재하지 않는 게시글 입니다. - articleId : " + articleId);
        }
    }

}
