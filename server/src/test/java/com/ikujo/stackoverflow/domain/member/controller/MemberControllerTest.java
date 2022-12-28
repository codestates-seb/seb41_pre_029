//package com.ikujo.stackoverflow.domain.member.controller;
//
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.ikujo.stackoverflow.config.LocalDateTimeSerializer;
//import com.ikujo.stackoverflow.domain.article.dto.response.ArticleDetailResponse;
//import com.ikujo.stackoverflow.domain.member.entity.Member;
//import com.ikujo.stackoverflow.domain.member.entity.Profile;
//import com.ikujo.stackoverflow.domain.member.entity.dto.MemberDto;
//import com.ikujo.stackoverflow.domain.member.entity.dto.MemberIdentityDto;
//import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;
//import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
//import com.ikujo.stackoverflow.domain.member.service.MemberService;
//import com.ikujo.stackoverflow.global.dto.BaseTimeDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.matches;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(MemberController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//class MemberControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private MemberService memberService;
//
//    @BeforeEach
//    void init() {
//        //LocalDateTime format error setting
//        GsonBuilder gsonBuilder = new GsonBuilder();
//        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
//        gson = gsonBuilder.setPrettyPrinting().create();
//    }
//
//    @DisplayName("회원가입 테스트")
//    @Test
//    public void signupTest() throws Exception {
//        //given
//        MemberSignupPost memberSignupPost = new MemberSignupPost("test@gmail.com", "test", "test");
//        String content = gson.toJson(memberSignupPost);
//
//        MemberResponse response = MemberResponse.of(
//                1L,
//                "test@gmail.com",
//                "test",
//                new Profile(
//                        "https://www.gravatar.com/avatar/571f9b56b9fe58dca664a393b6d2793c?s=192&d=identicon&r=PG",
//                        null,
//                        null,
//                        null
//                ),
//                LocalDateTime.now(),
//                LocalDateTime.now()
//        );
//
//        given(memberService.createMember(any(MemberSignupPost.class))).willReturn(response);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/members/signup")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        //then
//        actions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.id").value(response.id()))
//                .andExpect(jsonPath("$.data.email").value(response.email()))
//                .andExpect(jsonPath("$.data.nickname").value(response.nickname()))
//                .andDo(document("signup",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
//                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("닉네임"),
//                                        fieldWithPath("data.profile").type(JsonFieldType.OBJECT).description("회원 프로필"),
//                                        fieldWithPath("data.profile.image").type(JsonFieldType.STRING).description("프로필 이미지"),
//                                        fieldWithPath("data.profile.location").type(JsonFieldType.NULL).description("프로필 지역"),
//                                        fieldWithPath("data.profile.title").type(JsonFieldType.NULL).description("프로필 제목"),
//                                        fieldWithPath("data.profile.aboutMe").type(JsonFieldType.NULL).description("프로필 소개"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("회원 가입 날짜"),
//                                        fieldWithPath("data.lastModifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
//                                )
//                        )
//                ));
//    }
//
//}

//@WithMockUser // 테스트용
//.with(csrf()); // 테스트용

//@AuthenticationPrincipal // 찾아보기