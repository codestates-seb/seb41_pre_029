package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    public Comment createComment(Long articleId, CommentPost commentPost) {

        Article article = findVerifiedArticle(articleId);
        Member member = findVerifiedMember(commentPost.memberId());

        CommentDto commentDto = CommentDto.of(commentPost, article, member);
        Comment comment = commentDto.toEntity();

        return commentRepository.save(comment);

    }

    public Comment updateComment(Long articleId, Long commentId, CommentPatch commentPatch) {

        Article article = findVerifiedArticle(articleId);
        Comment comment = findVerifiedComment(commentId);
        Member member = findVerifiedMember(comment.getMember().getId());

        CommentDto commentDto = CommentDto.of(comment, commentPatch, article, member);
        Comment newComment = commentDto.toEntity();

        return commentRepository.save(newComment);

    }

    public Comment findComment(Long commentId) {

        return findVerifiedComment(commentId);
    }

    public List<CommentResponse> findComments(Long articleId) {

        Article article = findVerifiedArticle(articleId);

        return article.getCommentList()
                .stream()
                .map(CommentResponse::from)
                .toList();

    }

    public void deleteComment(Long commentId) {

        Comment comment = findVerifiedComment(commentId);
        commentRepository.delete(comment);

    }

    public Article findVerifiedArticle(Long articleId) {

        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        Article findArticle = optionalArticle
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));

        return findArticle;

    }

    public Member findVerifiedMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));

        return findMember;

    }

    public Comment findVerifiedComment(Long commentId) {

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment
                .orElseThrow(() -> new RuntimeException("답글이 존재하지 않습니다."));

        return findComment;

    }

}
