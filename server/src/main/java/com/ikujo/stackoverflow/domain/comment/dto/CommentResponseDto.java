package com.ikujo.stackoverflow.domain.comment.dto;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;

import java.time.LocalDateTime;
import java.util.List;

public record CommentResponseDto(Long id,
                                 String content,
                                 Integer recommendCount,
                                 Boolean selection,
                                 LocalDateTime createdAt,
                                 LocalDateTime lastModifiedAt,
                                 MemberDummyDto member) {

    public static CommentResponseDto of(Comment comment) {

        Member member1 = new Member(1L,
                "aaa@gmail.com",
                "1234",
                "김회원",
                new Profile("이미지", "대한민국", "안녕하세요", "김회원입니다~"));

        Long id = comment.getId();
        String content = comment.getContent();
        Integer recommendCount = comment.getRecommendCount();
        Boolean selection = comment.getSelection();
        LocalDateTime createdAt = comment.getCreatedAt();
        LocalDateTime lastModifiedAt = comment.getLastModifiedAt();
        MemberDummyDto member = MemberDummyDto.of(member1);

        return new CommentResponseDto(id, content, recommendCount, selection, createdAt, lastModifiedAt, member);
    }

}



