package com.ikujo.stackoverflow.domain.comment.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
import com.ikujo.stackoverflow.domain.article.entity.Article;
import com.ikujo.stackoverflow.domain.article.repository.ArticleRepository;
import com.ikujo.stackoverflow.domain.comment.dto.CommentPost;
import com.ikujo.stackoverflow.domain.comment.entity.Comment;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void init() {
        //LocalDateTime format error setting
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
        gson = gsonBuilder.setPrettyPrinting().create();
    }


    @DisplayName("[API][POST] 답글 작성 - 정상 호출")
    @Test
    void postComment() throws Exception {

        // given
        CommentPost commentPost = new CommentPost("블라블라블라", 1L);
        String content = gson.toJson(commentPost);

        Member member = new Member(1L, "j01039519778@gmail.com", "111222333444", "greatshine",
                new Profile("이미지","동해", "자바 스프링 개발자", "언제나 화이팅"));
        Article article = new Article(1L, member, "자바","이거 어떻게 하나요", "Java", 1L, null, null);

        memberRepository.save(member);
        articleRepository.save(article);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/questions/{article-id}/comments", article.getId())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isCreated())
                .andReturn();
                //.andExpect(header().string("Location", is(startsWith("/questions/{article-id}/comments"))));

    }
}
