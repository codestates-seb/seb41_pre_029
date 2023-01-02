package com.ikujo.stackoverflow.domain.comment.entity;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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

    @OneToMany(mappedBy = "comment", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<CommentRecommend> commentRecommendList = new ArrayList<>();

    public void addCommentRecommend(CommentRecommend commentRecommend){
        commentRecommendList.add(commentRecommend);
        if(commentRecommend.getComment() != this){
            commentRecommend.setComment(this);
        }
    }

    public Boolean isSelection() {
        return this.selection;
    }

    public Comment(Long id, Article article, Member member, String content, Boolean selection) {
        this.id = id;
        this.article = article;
        this.member = member;
        this.content = content;
        this.selection = selection;
    }

    public static Comment of(Long id, Article article, Member member, String content, Boolean selection) {
        return new Comment(id, article, member, content, selection);
    }
}
