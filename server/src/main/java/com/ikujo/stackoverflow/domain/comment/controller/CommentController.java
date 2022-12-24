package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.comment.dto.*;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;

import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
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
    public ResponseEntity postComment(@PathVariable("article-id") Long id,
                                      @RequestBody CommentPost commentPost) {
        CommentDto commentDto = CommentDto.of(commentPost);
        Comment comment = commentService.createMember(commentDto);
        CommentResponse commentResponse = CommentResponse.of(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponse), HttpStatus.CREATED);
    }

}
