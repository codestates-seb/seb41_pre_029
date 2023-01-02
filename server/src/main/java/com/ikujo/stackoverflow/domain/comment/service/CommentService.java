package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentSelection;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
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

    private final JwtTokenizer jwtTokenizer;

    public CommentResponse createComment(Long articleId, String token, CommentPost commentPost) {

        Article article = findVerifiedArticle(articleId);
        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Member member = findVerifiedMember(memberId);

        CommentDto commentDto = CommentDto.of(commentPost, article, member);
        Comment comment = commentDto.toEntity();
        commentRepository.save(comment);

        return CommentResponse.from(comment);

    }

    public void updateComment(Long commentId, String token, CommentPatch commentPatch) {

        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Comment comment = findVerifiedComment(commentId);

        if(memberId != comment.getMember().getId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
        }

        CommentDto commentDto = CommentDto.of(comment, commentPatch);

        commentRepository.save(commentDto.toEntity());

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

    public void deleteComment(Long commentId, String token) {

        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Comment comment = findVerifiedComment(commentId);

        if(memberId != comment.getMember().getId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
        }

        commentRepository.delete(comment);

    }

    public void updateSelection(Long commentId, String token, CommentSelection commentSelection) {

        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Comment comment = findVerifiedComment(commentId);
        Article article = findVerifiedArticle(comment.getArticle().getId());

        if(memberId != article.getMember().getId()) { // 답글 채택 버튼을 누른 사람이 게시글 작성자와 같지 않다면
            throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
        }

        CommentDto commentDto = CommentDto.of(comment, commentSelection);

        commentRepository.save(commentDto.toEntity());

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
