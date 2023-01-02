package com.ikujo.stackoverflow.domain.article.dto.response;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.entity.ArticleRecommend;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;
import com.ikujo.stackoverflow.global.dto.BaseTimeDto;

import java.util.List;

import static com.ikujo.stackoverflow.domain.article.dto.response.ArticleResponse.tagSplit;

public record ArticleDetailResponse(
        MemberIdentityDto member,
        Long id,
        String title,
        String content,
        List<String> tags,
        Long hits,
        BaseTimeDto baseTime,
        ArticleLikeInfo articleLikeInfo

) {

    public static ArticleDetailResponse of(MemberIdentityDto member, Long id, String title, String content,
                                           String tag, Long hits, BaseTimeDto baseTime, ArticleLikeInfo articleLikeInfo) {
        List<String> tags = tagSplit(tag);

        return new ArticleDetailResponse(
                member,
                id,
                title,
                content,
                tags,
                hits,
                baseTime,
                articleLikeInfo
        );
    }

    public static ArticleDetailResponse from(Article article, Long memberId) {
        List<String> tags = tagSplit(article.getTag());
        MemberIdentityDto memberIdentityResponse = MemberIdentityDto.of(article.getMember().getId(), article.getMember().getProfile().getImage(), article.getMember().getNickname());
        BaseTimeDto baseTimeDto = BaseTimeDto.of(article.getCreatedAt(), article.getLastModifiedAt());
        Integer totalLike = article.getArticleRecommendList().stream()
                .mapToInt(ArticleRecommend::getFlag)
                .sum();
        Integer flag = article.getArticleRecommendList().stream()
                .filter(a -> a.getMember().getId().equals(memberId))
                .findFirst()
                .map(ArticleRecommend::getFlag)
                .orElse(0);
        String currentState = null;
        if(flag == 0) {
            currentState = "nothing";
        }
        if(flag == 1){
            currentState = "like";
        }
        if(flag == -1){
            currentState = "unlike";
        }
        ArticleLikeInfo articleLikeInfo = ArticleLikeInfo.of(currentState, totalLike);

        return new ArticleDetailResponse(
                memberIdentityResponse,
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getHits(),
                baseTimeDto,
                articleLikeInfo
        );
    }

    public static ArticleDetailResponse from(Article article) {
        List<String> tags = tagSplit(article.getTag());
        MemberIdentityDto memberIdentityResponse = MemberIdentityDto.of(article.getMember().getId(), article.getMember().getProfile().getImage(), article.getMember().getNickname());
        BaseTimeDto baseTimeDto = BaseTimeDto.of(article.getCreatedAt(), article.getLastModifiedAt());
        Integer totalLike = article.getArticleRecommendList().stream()
                .mapToInt(ArticleRecommend::getFlag)
                .sum();
        ArticleLikeInfo articleLikeInfo = ArticleLikeInfo.of("nothing", totalLike);

        return new ArticleDetailResponse(
                memberIdentityResponse,
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getHits(),
                baseTimeDto,
                articleLikeInfo
        );
    }

}