package com.ikujo.stackoverflow.domain.article.dto.response;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;
import com.ikujo.stackoverflow.global.dto.BaseTimeDto;

import java.util.ArrayList;
import java.util.List;

public record ArticleResponse(
        MemberIdentityDto member,
        Long id,
        String title,
        String content,
        List<String> tags,
        Integer recommendCount,
        Long hits,
        BaseTimeDto baseTime,
        Boolean selection,
        Integer commentCount
) {

    public static ArticleResponse from(Article article) {
        List<String> tags = tagSplit(article.getTag());
        MemberIdentityDto memberIdentityResponse = MemberIdentityDto.of(article.getMember().getId(), article.getMember().getProfile().getImage(), article.getMember().getNickname());
        BaseTimeDto baseTimeDto = BaseTimeDto.of(article.getCreatedAt(), article.getLastModifiedAt());
        Boolean selection = article.getCommentList().stream()
                .anyMatch(Comment::isSelection);

        return new ArticleResponse(memberIdentityResponse,
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getArticleRecommendList().size(),
                article.getHits(),
                baseTimeDto,
                selection,
                article.getCommentList().size()
        );
    }

    public static List<String> tagSplit(String tag) {
        List<String> tags = new ArrayList<>();
        tag = tag.replace("##", " #");
        String[] tagSplit = tag.split(" ");
        for (int i = 1; i < tagSplit.length; i++) {
            tags.add(tagSplit[i]);
        }

        return tags;
    }

}
