package com.ikujo.stackoverflow.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentSelection(@NotBlank(message = "공백이 올 수 없습니다.") Boolean selection) {
}
