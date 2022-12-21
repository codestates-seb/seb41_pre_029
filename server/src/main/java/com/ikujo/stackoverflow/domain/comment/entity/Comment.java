package com.ikujo.stackoverflow.domain.comment.entity;

import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Comment extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private Boolean selection;

    @Column(nullable = false)
    private Integer recommendCount;

}
