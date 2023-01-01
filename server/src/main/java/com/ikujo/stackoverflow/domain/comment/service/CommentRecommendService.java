package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.comment.dto.CommentRecommendDto;
import com.ikujo.stackoverflow.domain.comment.dto.response.CommentRecommendResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRecommendRepository;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.auth.jwt.JwtTokenizer;
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

    private final JwtTokenizer jwtTokenizer;

    public CommentRecommendResponse Likes(Long commentId, String token) {

        Comment comment = findVerifiedComment(commentId);
        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Member member = findVerifiedMember(memberId);
        CommentRecommendDto commentRecommendDto =
                getCommentRecommendDto(commentId, memberId, comment, member);

        if(commentRecommendDto.flag() == 0) {
            CommentRecommendResponse commentRecommendResponse = CommentRecommendResponse
                            .fromLike(commentRecommendRepository.save(CommentRecommend.of(member, comment, 1)));

            return commentRecommendResponse;
        } else if(commentRecommendDto.flag() == 1) {
            commentRecommendRepository.deleteById(commentRecommendDto.id());
            CommentRecommendResponse commentRecommendResponse = CommentRecommendResponse.from(comment);

            return commentRecommendResponse;
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }
    }

    public CommentRecommendResponse UnLikes(Long commentId, String token) {

        Comment comment = findVerifiedComment(commentId);
        Long memberId = jwtTokenizer.tokenToMemberId(token);
        Member member = findVerifiedMember(memberId);
        CommentRecommendDto commentRecommendDto =
                getCommentRecommendDto(commentId, memberId, comment, member);

        if(commentRecommendDto.flag() == 0) {
            CommentRecommendResponse commentRecommendResponse = CommentRecommendResponse
                    .fromUnlike(commentRecommendRepository.save(CommentRecommend.of(member, comment, -1)));

            return commentRecommendResponse;
        } else if(commentRecommendDto.flag() == -1) {
            commentRecommendRepository.deleteById(commentRecommendDto.id());
            CommentRecommendResponse commentRecommendResponse = CommentRecommendResponse.from(comment);
            // 이 시점에서는 comment의 CommentRecommendList에 들어있는 CommentRecommend들이 재설정되어 있을테니 comment를 넘겨줘서 계산

            return commentRecommendResponse;
        } else {
            throw new BusinessLogicException(ExceptionCode.FLAG_DUPLICATED);
        }
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

    private CommentRecommendDto getCommentRecommendDto(Long commentId, Long memberId, Comment comment, Member member) {
        return commentRecommendRepository.findAllByCommentId(commentId).stream()
                .filter(recommend -> recommend.getMember().getId().equals(memberId))
                .findFirst()
                .map(CommentRecommendDto::from)
                .orElse(CommentRecommendDto.of(null, member, comment, 0));
    }

}
