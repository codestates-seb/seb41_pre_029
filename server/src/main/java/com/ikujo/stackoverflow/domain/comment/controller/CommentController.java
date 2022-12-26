package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.*;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions/{article-id}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postComment(@PathVariable("article-id") @Positive Long articleId,
                                      @RequestBody CommentPost commentPost) {

        Comment comment = commentService.createComment(articleId, commentPost);
        CommentResponse commentResponse = CommentResponse.from(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("article-id") @Positive Long articleId,
                                       @PathVariable("comment-id") @Positive Long commentId,
                                       @RequestBody CommentPatch commentPatch) {

        Comment comment = commentService.updateComment(articleId, commentId, commentPatch);
        CommentResponse commentResponse = CommentResponse.from(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getComment(@PathVariable("article-id") @Positive Long articleId) {
        // 답글이 없을 경우엔? Know someone who can answer? Share a link to this question via email, Twitter, or Facebook.
        // 이라는 글이 보이고 있다..
        // 해당 폼은 게시글 쪽에서 관리해야 하는가?

        return null;
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("article-id") @Positive Long articleId,
                                        @PathVariable("comment-id") @Positive Long commentId) {

        commentService.deleteComment(articleId, commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
