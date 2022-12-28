package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.comment.dto.CommentRecommendDto;
import com.ikujo.stackoverflow.domain.comment.dto.request.CommentRecommendPost;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentRecommendResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRecommendRepository;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.exception.BusinessLogicException;
import com.ikujo.stackoverflow.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentRecommendService {

    private final MemberRepository memberRepository;

    private final CommentRepository commentRepository;

    private final CommentRecommendRepository commentRecommendRepository;

    public CommentRecommendResponse Likes(Long commentId, CommentRecommendPost commentRecommendPost) {

        Comment comment = findVerifiedComment(commentId);
        Member member = findVerifiedMember(comment.getMember().getId());
        CommentRecommendDto commentRecommendDto = CommentRecommendDto.of(member, comment, commentRecommendPost);

        if(commentRecommendDto.flag() == 0) {
            commentRecommendRepository.save(commentRecommendDto.toEntity());
        } else if(commentRecommendDto.flag() == 1) {
            commentRecommendRepository.deleteById(commentRecommendDto.id());
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }
        return null;
    }

    public CommentRecommendResponse UnLikes(Long commentId, CommentRecommendPost commentRecommendPost) {

        Comment comment = findVerifiedComment(commentId);
        Member member = findVerifiedMember(comment.getMember().getId());
        CommentRecommendDto commentRecommendDto = CommentRecommendDto.of(member, comment, commentRecommendPost);

        if(commentRecommendDto.flag() == 0) {
            commentRecommendRepository.save(commentRecommendDto.toEntity());
        } else if(commentRecommendDto.flag() == -1) {
            commentRecommendRepository.deleteById(commentRecommendDto.id());
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }

        return null;
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
