package com.ikujo.stackoverflow.domain.member.controller;

import com.google.gson.Gson;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.domain.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

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


    @DisplayName("회원 프로필 조회 테스트")
    @Test
    public void getMemberProfileTest() throws Exception {
        //given
        Long id = 1L;


        //when

        //then
    }
}