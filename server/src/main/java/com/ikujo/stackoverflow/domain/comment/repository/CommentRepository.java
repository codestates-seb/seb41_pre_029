package com.ikujo.stackoverflow.domain.comment.repository;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
