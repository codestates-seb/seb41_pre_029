package com.ikujo.stackoverflow.domain.comment.entity;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@DynamicInsert
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
    @ColumnDefault("false")
    private Boolean selection;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer recommendCount;

    @OneToMany(mappedBy = "comment", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<CommentRecommend> commentRecommendList = new ArrayList<>();

    public void addCommentRecommend(CommentRecommend commentRecommend){
        commentRecommendList.add(commentRecommend);
        if(commentRecommend.getComment() != this){
            commentRecommend.setComment(this);
        }
    }

    public Comment(Article article, Member member, String content, Boolean selection,
                   Integer recommendCount, List<CommentRecommend> commentRecommendList) {
        this.article = article;
        this.member = member;
        this.content = content;
        this.selection = selection;
        this.recommendCount = recommendCount;
        this.commentRecommendList = commentRecommendList;
    }

    public static Comment of(Article article, Member member, String content, Boolean selection,
                             Integer recommendCount, List<CommentRecommend> commentRecommendList) {
        return new Comment(article, member, content, selection, recommendCount, commentRecommendList);
    }
}
