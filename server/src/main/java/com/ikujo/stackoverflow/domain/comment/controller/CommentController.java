package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentRecommendPost;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentMultiResponseDto;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;

import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions/{article-id}/comments")
@CrossOrigin
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postComment(@PathVariable("article-id") @Positive Long articleId,
                                      @Valid @RequestBody CommentPost commentPost) {

        CommentResponse commentResponse = commentService.createComment(articleId, commentPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive Long commentId,
                                       @Valid @RequestBody CommentPatch commentPatch) {

        commentService.updateComment(commentId, commentPatch);

        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);

    }

    @GetMapping("/{comment-id}") // 답글 수정을 위한 단일 조회
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive Long commentId) {

        CommentResponse commentResponse = commentService.findComment(commentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getComments(@PathVariable("article-id") @Positive Long articleId) {

        List<CommentResponse> commentResponseList = commentService.findComments(articleId);

        if(commentResponseList.isEmpty()) {
            return new ResponseEntity<>(commentResponseList, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(
                new CommentMultiResponseDto<>(commentResponseList.size(), commentResponseList), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("article-id") @Positive Long articleId,
                                        @PathVariable("comment-id") @Positive Long commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{comment-id}/likes")
    public ResponseEntity postLikes(@PathVariable("article-id") @Positive Long articleId,
                                    @PathVariable("comment-id") @Positive Long commentId,
                                    @Valid @RequestBody CommentRecommendPost commentRecommendPost) {
        return null;
    }

    @PostMapping("/{comment-id}/unlikes")
    public ResponseEntity postUnlikes() {
        return null;
    }




}
