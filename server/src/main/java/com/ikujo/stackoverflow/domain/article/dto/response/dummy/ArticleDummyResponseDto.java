package com.ikujo.stackoverflow.domain.article.dto.response.dummy;

import com.ikujo.stackoverflow.global.dto.BaseTimeDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// FIXME: DummyDTO 실로직 만들어지는데로 삭제.
public record ArticleDummyResponseDto(
        ArticleMemberDummyResponseDto member,
        Long id,
        String title,
        String content,
        List<String> tags,
        Integer recommendCount,
        Long hits,
        BaseTimeDto baseTime
) {

    public static ArticleDummyResponseDto of(String nickname, Long memberId, Long id, String title, String content,
                                             String tag, Integer recommendCount, Long hits) {
        List<String> tags = tagSplit(tag);
        ArticleMemberDummyResponseDto member = ArticleMemberDummyResponseDto.of(nickname, memberId);
        BaseTimeDto baseTimeDto = BaseTimeDto.of(LocalDateTime.now(), LocalDateTime.now());

        return new ArticleDummyResponseDto(member, id, title, content, tags, recommendCount, hits, baseTimeDto);
    }

    // 태그 분리로직 -> 정규식으로 고칠 예정.
    public static List<String> tagSplit(String tag) {
        List<String> tags = new ArrayList<>();
        tag = tag.replace("#", " #");
        System.out.println(tag);
        String[] tagSplit = tag.split(" ");
        for (int i = 1; i < tagSplit.length; i++) {
            tags.add(tagSplit[i]);
        }

        return tags;
    }

}
