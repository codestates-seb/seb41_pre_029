package com.ikujo.stackoverflow.domain.article.dto;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.entity.ArticleRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;

public record ArticleRecommendDto(
        Long id,
        Member member,
        Article article,
        Integer flag
) {

    public static ArticleRecommendDto of( Long id, Member member, Article article, Integer flag) {
        return new ArticleRecommendDto(id, member, article, flag);
    }

    public static ArticleRecommendDto from(ArticleRecommend articleRecommend) {

        return new ArticleRecommendDto(
                articleRecommend.getId(),
                articleRecommend.getMember(),
                articleRecommend.getArticle(),
                articleRecommend.getFlag()
        );
    }

    public ArticleRecommend toEntity(){
        return ArticleRecommend.of(
                id,
                member,
                article,
                flag
        );
    }

}
