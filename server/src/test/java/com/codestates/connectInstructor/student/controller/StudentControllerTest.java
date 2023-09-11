package com.codestates.connectInstructor.student.controller;


import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.mapper.StudentMapper;
import com.codestates.connectInstructor.student.service.StudentService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
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
import org.springframework.security.test.context.support.WithMockUser;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;

@WebMvcTest(controllers = StudentController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class StudentControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StudentMapper mapper;
    @MockBean
    private StudentService service;
    @Autowired
    private Gson gson;

    @Test
    @WithAnonymousUser
    public void postStudentTest() throws Exception {
        StudentDto.Post request = StudentDto.Post.builder()
                .email("test@example.com")
                .password("test1234")
                .name("테스트")
                .build();

        Student student = new Student();

        given(mapper.postToStudent(Mockito.any(StudentDto.Post.class))).willReturn(student);
        given(service.createStudent(Mockito.any(Student.class))).willReturn(student);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/students")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(document("post-student",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                                )
                        )));
    }

    @Test
    @WithAnonymousUser
    public void verifyEmailTest() throws Exception {
        String email = "test@example.com";

        given(service.checkUsedEmail(Mockito.anyString())).willReturn(false);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/students/check/{email}", email)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document(
                        "verify-email",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("email").description("중복 여부를 조회하고자하는 이메일")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("used").type(JsonFieldType.BOOLEAN).description("중복 여부. true는 중복, false는 중복X")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchIntroductionTest() throws Exception {
        long id = 1L;
        String introduction = "자기소개";

        StudentDto.PatchIntroduction request = StudentDto.PatchIntroduction.builder().id(id).introduction(introduction).build();

        Student student = new Student();
        student.setId(id);
        student.setIntroduction(introduction);

        given(mapper.patchIntroductionToStudent(Mockito.any(StudentDto.PatchIntroduction.class))).willReturn(student);
        given(service.updateIntroduction(Mockito.any(Student.class))).willReturn(student);
        given(mapper.studentToPatchIntroduction(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/introduction")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-introduction",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("자기소개")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("자기소개 수정 후")
                                )
                        )
                        ));
    }

}
