package com.ikujo.stackoverflow.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentPatch(@NotBlank(message = "본문에는 공백만 포함되어서는 안됩니다.") String content) {
}
