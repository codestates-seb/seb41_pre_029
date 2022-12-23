package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPostDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentResponseDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentMultiResponseDto;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions/{article-id}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postComments(@PathVariable("article-id") Long id,
                                       @RequestBody CommentPostDto commentPostDto) {
        Comment comment = commentService.createMember(commentPostDto.toEntity());
        CommentResponseDto commentResponseDto = CommentResponseDto.of(commentService.createMember(comment));

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponseDto), HttpStatus.CREATED);
    }

    }

