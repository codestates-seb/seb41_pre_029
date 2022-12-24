package com.ikujo.stackoverflow.domain.comment.entity;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
public class Comment extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private Boolean selection;

    @Column(nullable = false)
    private Integer recommendCount;

    @OneToMany(mappedBy = "comment", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<CommentRecommend> commentRecommendList = new ArrayList<>();

    public void addCommentRecommend(CommentRecommend commentRecommend) {
        commentRecommendList.add(commentRecommend);
        if (commentRecommend.getComment() != this) {
            commentRecommend.setComment(this);
        }
    }

    public Boolean isSelection() {
        return this.selection;
    }

}
