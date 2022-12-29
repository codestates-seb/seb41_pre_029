package com.ikujo.stackoverflow.domain.article.entity;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
public class ArticleRecommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(nullable = false)
    private Integer flag;

    public static ArticleRecommend of(Long id, Member member, Article article, Integer flag) {
        return new ArticleRecommend(id, member, article, flag);
    }

}
