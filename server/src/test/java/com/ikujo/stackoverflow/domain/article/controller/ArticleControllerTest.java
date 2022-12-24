package com.ikujo.stackoverflow.domain.article.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
import com.ikujo.stackoverflow.domain.article.service.ArticleService;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;
import com.ikujo.stackoverflow.global.dto.BaseTimeDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("RestController - 게시글")
@WebMvcTest(ArticleController.class)
@MockBean(JpaMetamodelMappingContext.class)
class ArticleControllerTest {

    private final MockMvc mockMvc;
    @MockBean
    private ArticleService articleService;
    @Autowired
    private Gson gson;

    ArticleControllerTest(@Autowired MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @BeforeEach
    void init() {
        //LocalDateTime format error setting
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    @DisplayName("[API][GET] 게시글 리스트 페이지 - 정상 호출")
    @Test
    void getQuestions() throws Exception {
        //given
        given(articleService.findArticles(any(Pageable.class)))
                .willReturn(Page.empty());

        //when
        ResultActions actions =
                mockMvc.perform(get("/questions")
                        .accept(MediaType.APPLICATION_JSON));

        //then
        then(articleService).should().findArticles(any(Pageable.class));
        actions.andExpect(status().isOk());
    }

    @DisplayName("[API][GET] 단일 게시글 - 정상 호출")
    @Test
    void getQuestion() throws Exception {
        //given
        Long articleId = 1L;
        ArticleDetailResponse articleDetail = createArticleDetailResponse();

        given(articleService.findArticle(anyLong()))
                .willReturn(articleDetail);

        String content = gson.toJson(articleDetail);

        //when
        ResultActions actions =
                mockMvc.perform(get("/questions/" + articleId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(articleDetail.id()))
                .andExpect(jsonPath("$.data.member.nickname").value(articleDetail.member().nickname()))
                .andExpect(jsonPath("$.data.title").value(articleDetail.title()));
    }

    private ArticleDetailResponse createArticleDetailResponse() {
        return ArticleDetailResponse.of(
                MemberIdentityDto.of(1L, "일쿠조"),
                1L,
                "첫 제목",
                "첫 내용",
                "#Java#Stack#Over#flow",
                1,
                11L,
                BaseTimeDto.of(LocalDateTime.now(), LocalDateTime.now())
        );
    }

}
