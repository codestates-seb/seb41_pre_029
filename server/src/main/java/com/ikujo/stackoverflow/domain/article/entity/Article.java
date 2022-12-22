package com.ikujo.stackoverflow.domain.article.entity;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Article extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 2000)
    private String content;

    private String tag;

    @Column(nullable = false)
    private Integer recommendCount;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<ArticleRecommend>  articleRecommendList= new ArrayList<>();

    public void addArticleRecommend(ArticleRecommend articleRecommend){
        articleRecommendList.add(articleRecommend);
        if(articleRecommend.getArticle() != this){
            articleRecommend.setArticle(this);
        }
    }
}
