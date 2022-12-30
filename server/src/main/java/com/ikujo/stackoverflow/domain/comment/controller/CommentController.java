package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentSelection;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentMultiResponseDto;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentRecommendResponse;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.service.CommentRecommendService;
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
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;

    private final CommentRecommendService commentRecommendService;

    @PostMapping
    public ResponseEntity postComment(@PathVariable("article-id") @Positive Long articleId,
                                      @RequestHeader(name = "Authorization") String token,
                                      @Valid @RequestBody CommentPost commentPost) {

        CommentResponse commentResponse = commentService.createComment(articleId, token, commentPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive Long commentId,
                                       @RequestHeader(name = "Authorization") String token,
                                       @Valid @RequestBody CommentPatch commentPatch) {

        commentService.updateComment(commentId, token, commentPatch);

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
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive Long commentId,
                                        @RequestHeader(name = "Authorization") String token) {

        commentService.deleteComment(commentId, token);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{comment-id}/likes")
    public ResponseEntity postLikes(@PathVariable("comment-id") @Positive Long commentId,
                                    @RequestHeader(name = "Authorization") String token) {

        CommentRecommendResponse commentRecommendResponse =
                commentRecommendService.Likes(commentId, token);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentRecommendResponse), HttpStatus.OK);
    }

    @PostMapping("/{comment-id}/unlikes")
    public ResponseEntity postUnlikes(@PathVariable("comment-id") @Positive Long commentId,
                                       @RequestHeader(name = "Authorization") String token) {

        CommentRecommendResponse commentRecommendResponse =
                commentRecommendService.UnLikes(commentId, token);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentRecommendResponse), HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}/selections")
    public ResponseEntity patchSelection(@PathVariable("comment-id") @Positive Long commentId,
                                         @RequestHeader(name = "Authorization") String token,
                                         @RequestBody CommentSelection commentSelection) {

        commentService.updateSelection(commentId, token, commentSelection);

        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }
}
