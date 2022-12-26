package com.ikujo.stackoverflow.domain.member.controller;

import com.google.gson.Gson;
import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberDto;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.domain.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;


    @DisplayName("회원 가입 테스트")
    @Test
    public void signupTest() throws Exception {
        //given
        MemberSignupPost memberSignupPost = new MemberSignupPost("test@gmail.com", "test", "test");
        String content = gson.toJson(memberSignupPost);

        Member member = MemberDto.of(memberSignupPost).toEntity();
        MemberResponse memberResponse = MemberResponse.of(member);

        given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/members/signup")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );


        //then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").value(memberResponse.id()))
                .andExpect(jsonPath("$.data.email").value(memberResponse.email()))
                .andExpect(jsonPath("$.data.nickname").value(memberResponse.nickname()))
                .andReturn();
    }

}