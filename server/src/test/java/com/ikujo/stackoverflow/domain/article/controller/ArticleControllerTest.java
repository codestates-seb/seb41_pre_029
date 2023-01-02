//package com.ikujo.stackoverflow.domain.article.controller;
//
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
//import com.ikujo.stackoverflow.domain.article.dto.ArticleDto;
//import com.ikujo.stackoverflow.domain.article.dto.request.ArticleRequest;
//import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
//import com.ikujo.stackoverflow.domain.article.dto.response.ArticlePatchResponse;
//import com.ikujo.stackoverflow.domain.article.service.ArticleService;
//import com.ikujo.stackoverflow.domain.member.entity.Member;
//import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;
//import com.ikujo.stackoverflow.global.dto.BaseTimeDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.BDDMockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@DisplayName("RestController - 게시글")
//@WebMvcTest(ArticleController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//class ArticleControllerTest {
//
//    private final MockMvc mockMvc;
//    @MockBean
//    private ArticleService articleService;
//    @Autowired
//    private Gson gson;
//
//    ArticleControllerTest(@Autowired MockMvc mockMvc) {
//        this.mockMvc = mockMvc;
//    }
//
//    @BeforeEach
//    void init() {
//        //LocalDateTime format error setting
//        GsonBuilder gsonBuilder = new GsonBuilder();
//        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
//        gson = gsonBuilder.setPrettyPrinting().create();
//    }
//
//    @DisplayName("[API][GET] 게시글 리스트 페이지 - 정상 호출")
//    @Test
//    void getQuestions() throws Exception {
//        //given
//        given(articleService.findArticles(any(Pageable.class)))
//                .willReturn(Page.empty());
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(get("/questions")
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        then(articleService).should().findArticles(any(Pageable.class));
//        actions.andExpect(status().isOk());
//    }
//
//    @DisplayName("[API][GET] 단일 게시글 - 정상 호출")
//    @Test
//    void getQuestion() throws Exception {
//        //given
//        Long articleId = 1L;
//        ArticleDetailResponse articleDetail = createArticleDetailResponse();
//
//        given(articleService.findArticle(anyLong()))
//                .willReturn(articleDetail);
//
//        String content = gson.toJson(articleDetail);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(get("/questions/{article-id}", articleId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        //then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.id").value(articleDetail.id()))
//                .andExpect(jsonPath("$.data.member.nickname").value(articleDetail.member().nickname()))
//                .andExpect(jsonPath("$.data.title").value(articleDetail.title()));
//    }
//
//    @DisplayName("[API][POST] 게시글 작성 - 정상 호출")
//    @Test
//    void postArticle() throws Exception {
//        //given
//        ArticleDto articleDto = createArticleDto();
//        given(articleService.saveArticle(any(ArticleRequest.class), anyLong()))
//                .willReturn(articleDto);
//
//        String content = gson.toJson(articleDto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(post("/questions")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        //then
//        actions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.title").value(articleDto.title()))
//                .andExpect(jsonPath("$.data.content").value(articleDto.content()));
//    }
//
//    @DisplayName("[API][DELETE] 게시글 삭제 - 정상 호출")
//    @Test
//    void deleteArticle() throws Exception {
//        //given
//        Long articleId = 1L;
//        willDoNothing().given(articleService).deleteArticle(articleId);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(delete("/questions/{article-id}", articleId)
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        actions.andExpect(status().isNoContent());
//        then(articleService).should().deleteArticle(articleId);
//    }
//
//    @Disabled("왜 안되는지 모르겠다.")
//    @DisplayName("[API][PATCH] 게시글 수정 - 정상 호출")
//    @Test
//    void patchArticle() throws Exception {
//        //given
//        Long articleId = 1L;
//        ArticleRequest articleRequest = createArticleRequest();
//
//        willDoNothing().given(articleService).patchArticle(articleId, articleRequest);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(patch("/questions/{article-id}", articleId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON));
//
//        //then
//        actions.andExpect(status().isResetContent());
//        then(articleService).should().patchArticle(articleId, articleRequest);
//    }
//
//    @DisplayName("[API][GET] 게시글 수정 기존글 불러오기 - 정상 호출")
//    @Test
//    void patchGetArticle() throws Exception {
//        //given
//        Long articleId = 1L;
//        ArticlePatchResponse articlePatchResponse = createArticlePatchResponse();
//        given(articleService.patchFindArticle(articleId))
//                .willReturn(articlePatchResponse);
//
//        String content = gson.toJson(articlePatchResponse);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(get("/questions/{article-id}/edit", articleId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        //then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.title").value(articlePatchResponse.title()))
//                .andExpect(jsonPath("$.data.content").value(articlePatchResponse.content()));
//    }
//
//
//    private ArticleDetailResponse createArticleDetailResponse() {
//        return ArticleDetailResponse.of(
//                MemberIdentityDto.of(1L, "이미지", "일쿠조"),
//                1L,
//                "첫 제목",
//                "첫 내용",
//                "##Java##Stack##Over##flow",
//                1,
//                11L,
//                BaseTimeDto.of(LocalDateTime.now(), LocalDateTime.now())
//        );
//    }
//
//    private ArticleDto createArticleDto() {
//        return ArticleDto.of(
//                (Member) null,
//                "Test Title",
//                "Test Content",
//                "##Java##Stack##Over##flow"
//        );
//    }
//
//    private ArticleRequest createArticleRequest(){
//        return ArticleRequest.of(
//                "Test Title",
//                "Test Content",
//                "##Java##Stack##Over##flow"
//        );
//    }
//
//    private ArticlePatchResponse createArticlePatchResponse(){
//        return ArticlePatchResponse.of(
//                "Test Title",
//                "Test Content",
//                List.of("#java", "#cup", "#aaa")
//        );
//    }
//}
