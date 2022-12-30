package com.ikujo.stackoverflow.domain.article.service.impl;

import com.ikujo.stackoverflow.domain.article.dto.ArticleRecommendDto;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.entity.ArticleRecommend;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRecommendRepository;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.article.service.ArticleRecommendService;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.exception.BusinessLogicException;
import com.ikujo.stackoverflow.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ArticleRecommendServiceImpl implements ArticleRecommendService {

    private final ArticleRecommendRepository articleRecommendRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    @Override
    public void pickedLike(Long articleId, Long memberId) {
        Article article = articleRepository.getReferenceById(articleId);
        Member member = memberRepository.getReferenceById(memberId);

        ArticleRecommendDto articleRecommendDto = getArticleRecommendDto(articleId, memberId, article, member);

        if (articleRecommendDto.flag() == 0) {
            articleRecommendRepository.save(ArticleRecommend.of(null, member, article, 1));
        } else if (articleRecommendDto.flag() == 1) {
            articleRecommendRepository.deleteById(articleRecommendDto.id());
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }
    }

    @Override
    public void pickedUnlike(Long articleId, Long memberId) {
        Article article = articleRepository.getReferenceById(articleId);
        Member member = memberRepository.getReferenceById(memberId);

        ArticleRecommendDto articleRecommendDto = getArticleRecommendDto(articleId, memberId, article, member);

        if (articleRecommendDto.flag() == 0) {
            articleRecommendRepository.save(ArticleRecommend.of(null, member, article, -1));
        } else if (articleRecommendDto.flag() == -1) {
            articleRecommendRepository.deleteById(articleRecommendDto.id());
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }
    }

    private ArticleRecommendDto getArticleRecommendDto(Long articleId, Long memberId, Article article, Member member) {
        return articleRecommendRepository.findAllByArticleId(articleId).stream()
                .filter(a -> a.getMember().getId().equals(memberId))
                .findFirst()
                .map(ArticleRecommendDto::from)
                .orElse(ArticleRecommendDto.of(null, member, article, 0));
    }

}
