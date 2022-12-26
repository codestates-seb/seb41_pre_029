package com.ikujo.stackoverflow.domain.comment.dto;

import jakarta.validation.constraints.NotBlank;

public record CommentPost(@NotBlank(message = "본문에는 공백만 포함되어서는 안됩니다.") String content,
                          Long memberId) {

}

// post your answer, 누르면 memberId도 프론트에서 받아와야 하는..?
