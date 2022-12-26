package com.ikujo.stackoverflow.domain.comment.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPatch;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPost;
import com.ikujo.stackoverflow.domain.comment.dto.CommentResponse;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.global.dto.BaseTimeDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentController.class)
@MockBean(JpaMetamodelMappingContext.class)
public class MockCommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @Autowired
    private Gson gson;

    @BeforeEach
    void init() {
        //LocalDateTime format error setting
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    @DisplayName("[API][POST] 게시글 작성")
    @Test
    void postComment() throws Exception {

        //given
        CommentDto commentDto = createCommentDto();
        given(commentService.createComment(anyLong(), any(CommentPost.class)))
                .willReturn(commentDto.toEntity());

        String content = gson.toJson(commentDto);

        //when
        ResultActions actions =
                mockMvc.perform(post("/questions/{article-id}/comments", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                );

        //then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.content").value(commentDto.content()));

    }

    @DisplayName("[API][PATCH] 게시글 수정")
    @Test
    void patchComment() throws Exception {

        //given
        CommentDto commentDto = updateCommentDto();
        given(commentService.updateComment(anyLong(), anyLong(), any(CommentPatch.class)))
                .willReturn(commentDto.toEntity());

        String content = gson.toJson(commentDto);

        //when
        ResultActions actions =
                mockMvc.perform(patch("/questions/{article-id}/comments/{comment-id}", 1L, 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value(commentDto.content()));

    }

    @DisplayName("[API][GET] 게시글 단일 조회")
    @Test
    void getComment() throws Exception {

        //given
        Long commentId = 1L;
        Comment comment = createComment();

        given(commentService.findComment(anyLong()))
                .willReturn(comment);

        String content = gson.toJson(comment);

        //when
        ResultActions actions =
                mockMvc.perform(get("/questions/{article-id}/comments/{comment-id}",1L, commentId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(comment.getId()))
                .andExpect(jsonPath("$.data.content").value(comment.getContent()));

    }

    @DisplayName("[API][GET] 게시글 조회")
    @Test
    void getComments() throws Exception {

        //given
        Long articleId = 1L;
        CommentResponse commentResponse1 = createCommentResponse1();
        CommentResponse commentResponse2 = createCommentResponse2();
        List<CommentResponse> commentResponseList = new ArrayList<>();

        commentResponseList.add(commentResponse1);
        commentResponseList.add(commentResponse2);

        given(commentService.findComments(articleId))
                .willReturn(commentResponseList);

        String content = gson.toJson(commentResponseList);

        //when
        ResultActions actions =
                mockMvc.perform(get("/questions/{article-id}/comments", articleId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                );

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data[-1:].content").value(commentResponseList.get(1).content()));

    }

    @DisplayName("[API][DELETE] 게시글 삭제")
    @Test
    void deleteComment() throws Exception {

        //given
        Long commentId = 1L;
        willDoNothing().given(commentService).deleteComment(commentId);

        //when
        ResultActions actions =
                mockMvc.perform(delete("/questions/{article-id}/comments/{comment-id}", 1L, commentId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        //then
        actions.andExpect(status().isNoContent());
        then(commentService).should().deleteComment(commentId);

    }





    private Member createMember() {
        return new Member(1L, "j01039519778@gmail.com", "111222333444", "greatshine",
                new Profile("이미지","동해", "자바 스프링 개발자", "언제나 화이팅"));
    }

    private Article createArticle() {
        return new Article(1L, createMember(), "자바","이거 어떻게 하나요", "Java", 1L,
                null, null);
    }

    private Comment createComment() {
        return new Comment(1L, createArticle(), createMember(), "블라블라블라", false, 0,
                null);
    }

    private CommentDto createCommentDto() {
        return CommentDto.of(
                new CommentPost("블라블라블라", createMember().getId()),
                createArticle(),
                createMember()
        );
    }

    private CommentDto updateCommentDto() {
        return CommentDto.of(
                createComment(),
                new CommentPatch("블라3"),
                createArticle(),
                createMember()
        );
    }

    private CommentResponse createCommentResponse1() {
        return CommentResponse.of(
                1L,
                "블라블라블라",
                0,
                false,
                createComment().creator(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    private CommentResponse createCommentResponse2() {
        return CommentResponse.of(
                2L,
                "블라",
                0,
                false,
                createComment().creator(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }
}
