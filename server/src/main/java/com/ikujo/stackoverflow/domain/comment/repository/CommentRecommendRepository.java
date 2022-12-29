package com.ikujo.stackoverflow.domain.comment.repository;

import com.ikujo.stackoverflow.domain.comment.entity.CommentRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRecommendRepository extends JpaRepository<CommentRecommend, Long> {
    Optional<CommentRecommend> findAllByCommentId(Long commentId);
}
