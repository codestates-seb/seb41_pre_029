package com.ikujo.stackoverflow.domain.comment.entity;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class CommentRecommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;
    
    @Column(nullable = false)
    private Integer flag;

    public CommentRecommend(Member member, Comment comment, Integer flag) {
        this.member = member;
        this.comment = comment;
        this.flag = flag;
    }

    public static CommentRecommend of(Member member, Comment comment, Integer flag) {
        return new CommentRecommend(member, comment, flag);
    }

}
