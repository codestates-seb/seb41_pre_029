package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPost;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    public Comment createComment(Long articleId, CommentPost commentPost) {

        Article article = articleRepository.findById(articleId).get();
        Member member = memberRepository.findById(commentPost.memberId()).get();

        CommentDto commentDto = CommentDto.of(commentPost, article, member);
        Comment comment = commentDto.toEntity();

        return commentRepository.save(comment);
    }
}

/*

post에서 신경써야할 거...
로그인을 하지 않은 상태에서 답글을 달려고 할 때? -> 답글 작성 폼에 들어가기 전에 체크가 되어야할텐데 어떻게 처리될지 = security



 */