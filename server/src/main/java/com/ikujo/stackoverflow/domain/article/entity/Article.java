package com.ikujo.stackoverflow.domain.article.entity;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor // 임시로 넣었음
@DynamicInsert
@Getter
@Entity
public class Article extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 300)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    private String tag;

    @ColumnDefault("0")
    private Long hits;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer recommendCount;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<ArticleRecommend> articleRecommendList= new ArrayList<>();

    public void addArticleRecommend(ArticleRecommend articleRecommend){
        articleRecommendList.add(articleRecommend);
        if(articleRecommend.getArticle() != this){
            articleRecommend.setArticle(this);
        }
    }
}
