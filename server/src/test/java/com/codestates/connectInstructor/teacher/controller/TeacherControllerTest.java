package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.teacher.dto.TeacherDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.mapper.TeacherMapper;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static com.codestates.connectInstructor.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.connectInstructor.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;

@WebMvcTest(controllers = TeacherController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class TeacherControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TeacherMapper mapper;
    @MockBean
    private TeacherService service;
    @Autowired
    private Gson gson;

    @Test
    @WithAnonymousUser
    public void postTeacherTest() throws Exception {
        TeacherDto.Post request = TeacherDto.Post.builder()
                .email("test@example.com")
                .password("test1234")
                .name("테스트")
                .introduction("자기 소개")
                .career("경력")
                .address("주소")
                .build();

        Teacher teacher = new Teacher();

        given(mapper.postToTeacher(Mockito.any(TeacherDto.Post.class))).willReturn(teacher);
        given(service.createTeacher(Mockito.any(Teacher.class))).willReturn(teacher);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/teachers")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(document("post-teacher",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("자기소개"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("경력"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("주소")
                                )
                        )));
    }

    @Test
    @WithAnonymousUser
    public void verifyEmailTest() throws Exception{
        String email = "test@example.com";

        doNothing().when(service).verifyEmail(anyString());

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .get("/teachers/verify/{email}", email)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(
                        document(
                                "verify-teacher-email",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("email").description("검증하고자하는 이메일")
                                )
                        )
                );
    }
}
