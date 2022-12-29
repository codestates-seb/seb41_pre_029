package com.ikujo.stackoverflow.domain.article.dto.response;

public record ArticleLikeInfo(
        String currentState,
        Integer totalLike
) {

    public static ArticleLikeInfo of(String currentState, Integer totalLike) {
        return new ArticleLikeInfo(currentState, totalLike);
    }

}
