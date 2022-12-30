package com.ikujo.stackoverflow.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentSelection(Boolean selection) {
}
