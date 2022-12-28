package com.ikujo.stackoverflow.domain.comment.dto.request;

import org.hibernate.validator.constraints.Range;

public record CommentRecommendPost(@Range(min = -1, max = 1) Integer flag) {
}

