package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentRecommendPost;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentRecommendResponse;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRecommendRepository;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.exception.BusinessLogicException;
import com.ikujo.stackoverflow.global.exception.ExceptionCode;
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

    private final CommentRecommendRepository commentRecommendRepository;

    public CommentResponse createComment(Long articleId, CommentPost commentPost) {

        Article article = findVerifiedArticle(articleId);
        Member member = findVerifiedMember(commentPost.memberId());

        CommentDto commentDto = CommentDto.of(commentPost, article, member);
        Comment comment = commentDto.toEntity();
        commentRepository.save(comment);

        return CommentResponse.from(comment);

    }

    public CommentResponse updateComment(Long articleId, Long commentId, CommentPatch commentPatch) {

        Article article = findVerifiedArticle(articleId);
        Comment comment = findVerifiedComment(commentId);
        Member member = findVerifiedMember(comment.getMember().getId());

        CommentDto commentDto = CommentDto.of(comment, commentPatch, article, member);
        Comment newComment = commentDto.toEntity();
        commentRepository.save(newComment);

        return CommentResponse.from(newComment);

    }

    public CommentResponse findComment(Long commentId) {

        Comment comment = findVerifiedComment(commentId);

        return CommentResponse.from(comment);
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

    public CommentRecommendResponse createLikes(Long articleId, Long commentId,
                                                CommentRecommendPost commentRecommendPost) {



        return null;
    }

    public Article findVerifiedArticle(Long articleId) {

        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        Article findArticle = optionalArticle
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));

        return findArticle;

    }

    public Member findVerifiedMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;

    }

    public Comment findVerifiedComment(Long commentId) {

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;

    }
}
