package com.ikujo.stackoverflow.domain.comment.service;

import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createMember(Comment comment) {
        return commentRepository.save(comment);
    }
}

/*

postdto -> entity -> 한 명은 여러 답글을 올릴 수 있다 = 어떠한 처리가 필요하진 않을 듯?
-> repository에 save -> save된 데이터를 응답데이터로


 */