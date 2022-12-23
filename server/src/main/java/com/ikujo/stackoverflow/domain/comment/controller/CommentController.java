package com.ikujo.stackoverflow.domain.comment.controller;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.CommentResponseDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentMultiResponseDto;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions/{article-id}/comments")
public class CommentController {

     @PostMapping
    public ResponseEntity postComments() {
         return null;
     }

    }

