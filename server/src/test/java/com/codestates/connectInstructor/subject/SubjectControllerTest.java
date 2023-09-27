package com.codestates.connectInstructor.subject;

import com.codestates.connectInstructor.subject.controller.SubjectController;
import com.codestates.connectInstructor.subject.dto.SubjectDto;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.mapper.SubjectMapper;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


import java.util.ArrayList;
import java.util.List;

import static com.codestates.connectInstructor.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.connectInstructor.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@WebMvcTest(SubjectController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
@WebMvcTest(SubjectController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class SubjectControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubjectService subjectService;

    @MockBean
    private SubjectMapper subjectMapper;

    @Autowired
    private Gson gson;

    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void postSubjectTest() throws Exception {
        //given
            //test data
        SubjectDto.Post post = new SubjectDto.Post("국어");
        String postContent = gson.toJson(post);
        Subject subject = new Subject();
        subject.setId(1L);
            //stubbing
        given(subjectMapper.subjectPostToSubject(Mockito.any(SubjectDto.Post.class))).willReturn(new Subject());
        given(subjectService.createSubject(Mockito.any(Subject.class))).willReturn(subject);
        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/subjects")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postContent)
                );
        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/subjects/"))))
                .andDo(document(       // (7)
                        "post-subject",     // (7-1)
                        getRequestPreProcessor(),      // (7-2)
                        getResponsePreProcessor(),     // (7-3)
                        requestFields(             // (7-4)
                                List.of(
                                        fieldWithPath("subjectName").type(JsonFieldType.STRING).description("과목명") // (7-5)
                                )
                        ),
                        responseHeaders(        // (7-6)
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void getSubjectsTest() throws Exception {
        //given
            //test data
        SubjectDto.Response response1 = new SubjectDto.Response(1L, "국어");
        SubjectDto.Response response2 = new SubjectDto.Response(2L, "한국사");
        List<SubjectDto.Response> responses = new ArrayList<>();
        responses.add(response1);
        responses.add(response2);
            //stubbing
        given(subjectService.findSubjects()).willReturn(new ArrayList<Subject>());
        given(subjectMapper.subjectsToSubjectResponses(Mockito.anyList())).willReturn(responses);
        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/subjects")
                                .accept(MediaType.APPLICATION_JSON)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-subjects",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        responseFields(
                                List.of(
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("현재 사용자가 등록/삭제 가능한 모든 정식 과목들 리스트"),
                                        fieldWithPath("subjects[].id").type(JsonFieldType.NUMBER).description("과목 식별자"),
                                        fieldWithPath("subjects[].subjectName").type(JsonFieldType.STRING).description("과목명")
                                )
                        )

                ));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void deleteSubjectWithIdTest() throws Exception {
        //given
        long subjectId = 1;
        doNothing().when(subjectService).deleteSubject(Mockito.anyLong());
        //when
        ResultActions actions =
                mockMvc.perform(delete("/subjects/{subject-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON));
        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-subject-with-id",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(parameterWithName("subject-id").description("과목 식별자"))));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void deleteSubjectWithNameTest() throws Exception {
        //given
        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("subjectName","국어");
        doNothing().when(subjectService).deleteSubject(Mockito.anyString());

        //when
        ResultActions actions =
                mockMvc.perform(delete("/subjects")
                        .accept(MediaType.APPLICATION_JSON)
                        .params(params));
        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-subject-with-name",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(parameterWithName("subjectName").description("과목 이름"))));
    }

}
