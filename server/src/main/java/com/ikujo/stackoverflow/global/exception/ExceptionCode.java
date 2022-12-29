package com.ikujo.stackoverflow.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    EMAIL_NOT_FOUND(404, "Email not found"),
    EMAIL_EXISTS(409, "Email exists"),
    ARTICLE_NOT_FOUND(404, "Article not found"),
    ARTICLE_EXISTS(409, "Article exists"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    FLAG_DUPLICATED(409, "Flag duplicated");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
