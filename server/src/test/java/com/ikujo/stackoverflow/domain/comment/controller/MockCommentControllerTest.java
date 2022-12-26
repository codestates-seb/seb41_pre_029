package com.ikujo.stackoverflow.domain.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CommentController.class)
@MockBean(JpaMetamodelMappingContext.class)
public class MockCommentControllerTest {

    @Autowired
    private MockMvc mockMvc;


}
