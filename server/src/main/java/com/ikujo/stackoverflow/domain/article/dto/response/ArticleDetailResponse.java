package com.ikujo.stackoverflow.domain.article.dto.response;

import com.ikujo.stackoverflow.domain.article.entity.Article;
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
        Integer recommendCount,
        Long hits,
        BaseTimeDto baseTime
) {

    public static ArticleDetailResponse of(MemberIdentityDto member, Long id, String title, String content,
                                           String tag, Integer recommendCount, Long hits, BaseTimeDto baseTime) {
        List<String> tags = tagSplit(tag);

        return new ArticleDetailResponse(
                member,
                id,
                title,
                content,
                tags,
                recommendCount,
                hits,
                baseTime
        );
    }

    public static ArticleDetailResponse from(Article article) {
        List<String> tags = tagSplit(article.getTag());
        MemberIdentityDto memberIdentityResponse = MemberIdentityDto.of(article.getMember().getId(), article.getMember().getProfile().getImage(), article.getMember().getNickname());
        BaseTimeDto baseTimeDto = BaseTimeDto.of(article.getCreatedAt(), article.getLastModifiedAt());

        return new ArticleDetailResponse(
                memberIdentityResponse,
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getArticleRecommendList().size(),
                article.getHits(),
                baseTimeDto
        );
    }

}
