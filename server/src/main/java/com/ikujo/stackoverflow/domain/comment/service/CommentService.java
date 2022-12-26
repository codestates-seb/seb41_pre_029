package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPost;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Comment updateComment(Long articleId, Long commentId, CommentPatch commentPatch) {

        Article article = articleRepository.findById(articleId).get();
        Comment comment = commentRepository.findById(commentId).get();
        Member member = memberRepository.findById(comment.getMember().getId()).get();

        CommentDto commentDto = CommentDto.of(comment, commentPatch, article, member);
        Comment newComment = commentDto.toEntity();

        return commentRepository.save(newComment);

    }

    public Comment getComment(Long articleId) {

        Article article = articleRepository.findById(articleId).get();
        //List<Comment> commentList = article.getCommentList();

        // 게시물에 저장되어 있는 Comment -> List 로 받았다. 만약 50개의 답글이 있다고 가정하면?
        // 페이징 네이션을 사용한다? 30개의 데이터가 넘어가는 순간 페이지가 생성되는 것 같다.
        // commentList 에 존재하는 데이터를 하나하나 추출해서 Response 로 바꾸는 작업이 필요한데, 어떻게?



        return null;
    }

    public void deleteComment(Long articleId, Long commentId) {

        Article article = articleRepository.findById(articleId).get();
        // List<Comment>에서 뽑아 온 데이터 중 commentId를 가진 comment 를 추출해서 삭제

    }
}