package com.ikujo.stackoverflow.domain.comment.repository;

import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRecommendRepository extends JpaRepository<CommentRecommend, Long> {
}
