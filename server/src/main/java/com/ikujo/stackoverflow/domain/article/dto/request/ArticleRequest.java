package com.ikujo.stackoverflow.domain.article.dto.request;

import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
import com.ikujo.stackoverflow.domain.member.entity.Member;

public record ArticleRequest(
        String title,
        String content,
        String tag
) {

    public ArticleDto toDto(Member member) {
        return ArticleDto.of(
                member,
                title,
                content,
                tag
        );
    }

}
