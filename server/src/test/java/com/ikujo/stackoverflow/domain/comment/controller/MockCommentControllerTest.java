package com.ikujo.stackoverflow.domain.comment.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
import com.ikujo.stackoverflow.domain.comment.dto.CommentDto;
import com.ikujo.stackoverflow.domain.comment.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

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

    @DisplayName("[API][POST] 게시글 작성 - 정상 호출")
    @Test
    void PostComment() throws Exception {
        //given

    }


    /*

    작성 예정입니다!

     */

}
