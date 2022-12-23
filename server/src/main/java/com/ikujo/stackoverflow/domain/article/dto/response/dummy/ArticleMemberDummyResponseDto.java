package com.ikujo.stackoverflow.domain.article.dto.response.dummy;

// FIXME: DummyDTO 실로직 만들어지는데로 삭제.
public record ArticleMemberDummyResponseDto(
        String nickname,
        Long memberId
) {

    public static ArticleMemberDummyResponseDto of(String nickname, Long memberId) {
        return new ArticleMemberDummyResponseDto(nickname, memberId);
    }
}
