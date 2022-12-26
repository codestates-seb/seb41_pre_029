package com.ikujo.stackoverflow.domain.article.entity;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 300)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    private String tag;

    @ColumnDefault("0")
    private Long hits;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<ArticleRecommend> articleRecommendList = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    public void addArticleRecommend(ArticleRecommend articleRecommend) {
        articleRecommendList.add(articleRecommend);
        if (articleRecommend.getArticle() != this) {
            articleRecommend.setArticle(this);
        }
    }

    public Article(Long id, Member member, String title, String content, String tag, Long hits) {
        this.id = id;
        this.member = member;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.hits = hits;
    }

    public static Article of(Long id, Member member, String title, String content, String tag, Long hits) {
        return new Article(id, member, title, content, tag, hits);
    }

    public void visitCount() {
        this.hits++;
    }

}
