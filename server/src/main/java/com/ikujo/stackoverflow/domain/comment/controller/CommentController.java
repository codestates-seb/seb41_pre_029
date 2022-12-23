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

    @GetMapping
    public ResponseEntity getComments(@PathVariable("article-id") Long id) {

        Member member = new Member(1L,
                "aaa@gmail.com",
                "1234",
                "김회원",
                new Profile("대한민국", "안녕하세요", "김회원입니다~"));
        Article article = new Article(1L, member, "블라블라블라", null, 0, null);

        Comment comment = new Comment(1L, article, member, "블라블라블라1", false, 0, null);
        Comment comment1 = new Comment(2L, article, member, "블라라2", false, 0, null);
        Comment comment2 = new Comment(3L, article, member, "블라블라3", false, 0, null);

        CommentResponseDto commentResponseDto = CommentResponseDto.of(comment);
        CommentResponseDto commentResponseDto1 = CommentResponseDto.of(comment1);
        CommentResponseDto commentResponseDto2 = CommentResponseDto.of(comment2);

        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();

        commentResponseDtoList.add(commentResponseDto);
        commentResponseDtoList.add(commentResponseDto1);
        commentResponseDtoList.add(commentResponseDto2);

        return new ResponseEntity<>(
                new CommentMultiResponseDto<>(commentResponseDtoList.size(),commentResponseDtoList), HttpStatus.OK);

    }
}
