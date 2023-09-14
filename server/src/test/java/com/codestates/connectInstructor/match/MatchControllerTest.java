package com.codestates.connectInstructor.match;

import com.codestates.connectInstructor.match.controller.MatchController;
import com.codestates.connectInstructor.match.dto.MatchDto;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.match.mapper.MatchMapper;
import com.codestates.connectInstructor.match.service.MatchService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static com.codestates.connectInstructor.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.connectInstructor.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@WebMvcTest(controllers = MatchController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class MatchControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private MatchService service;
    @MockBean
    private MatchMapper mapper;

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void startMatchTest() throws Exception {
        long studentId = 1L;
        long teacherId = 1L;
        List<String> subjects = List.of("국어", "영어");
        List<String> regions = List.of("강서", "강북");
        String studentName = "김학생";
        String studentPhone = "01011112222";
        String studentEmail = "student@example.com";

        MatchDto.GetResponse response = new MatchDto.GetResponse();

        response.setStudentId(studentId);
        response.setTeacherId(teacherId);
        response.setSubjects(subjects);
        response.setRegions(regions);
        response.setSchedules(List.of("9월 19일 화요일 / 13:00 ~ 14:00"));
        response.setStudentName(studentName);
        response.setStudentPhone(studentPhone);
        response.setStudentEmail(studentEmail);

        given(service.getBasicInformation(Mockito.anyLong(), Mockito.anyLong())).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/matches")
                        .param("teacherId", String.valueOf(teacherId))
                        .param("studentId", String.valueOf(studentId))
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("start-match",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("teacherId").description("매칭하고자하는 강사 식별자"),
                                parameterWithName("studentId").description("매칭하고자하는 학생 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학생 식별자"),
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사가 수업 가능한 과목"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사가 수업 가능한 지역"),
                                        fieldWithPath("schedules").type(JsonFieldType.ARRAY).description("강사가 수업 가능한 시간"),
                                        fieldWithPath("studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("studentPhone").type(JsonFieldType.STRING).description("학생 연락처"),
                                        fieldWithPath("studentEmail").type(JsonFieldType.STRING).description("학생 이메일")
                                )
                        )

                        ));

    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void postMatchTest() throws Exception {
        long studentId = 1L;
        long teacherId = 1L;
        boolean isOnline = false;
        List<String> subjects = List.of("국어", "영어");
        List<String> regions = List.of("강서", "강남");
        String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";
        String studentName = "김학생";
        String studentPhone = "01012345678";
        String studentEmail = "student@example.com";
        String remarks = "특이사항";

        MatchDto.Post request = MatchDto.Post.builder()
                .studentId(studentId).teacherId(teacherId).isOnline(isOnline)
                .subjects(subjects).regions(regions).schedule(schedule).studentName(studentName)
                .studentPhone(studentPhone).studentEmail(studentEmail).remarks(remarks).build();

        MatchDto.Response response = MatchDto.Response.builder()
                .id(1L).studentId(studentId).teacherId(teacherId).status(Match.MatchStatus.MATCH_REQUEST)
                .matchSubjects(subjects).matchRegions(regions).schedule(schedule).isOnline(isOnline)
                .studentName(studentName).studentPhone(studentPhone).studentEmail(studentEmail)
                .remarks(remarks).teacherName("박강사")
        .build();

        given(service.postMatch(Mockito.any(MatchDto.Post.class))).willReturn(new Match());
        given(mapper.matchToResponse(Mockito.any(Match.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/matches")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(document("post-match",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학생 식별자"),
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("isOnline").type(JsonFieldType.BOOLEAN).description("온라인 수업 여부. true일 경우 온라인. false일 경우 오프라인"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("수업 신청할 과목들"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("수업 가능한 지역들"),
                                        fieldWithPath("schedule").type(JsonFieldType.STRING).description("수업 스케줄"),
                                        fieldWithPath("studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("studentPhone").type(JsonFieldType.STRING).description("학생 연락처"),
                                        fieldWithPath("studentEmail").type(JsonFieldType.STRING).description("학생 이메일"),
                                        fieldWithPath("remarks").type(JsonFieldType.STRING).description("기타 추가사항")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 매칭의 식별자"),
                                        fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학생 식별자"),
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("매칭의 상태. 생성된 직후에는 MATCH_REQUEST"),
                                        fieldWithPath("matchSubjects").type(JsonFieldType.ARRAY).description("과목들"),
                                        fieldWithPath("matchRegions").type(JsonFieldType.ARRAY).description("수업 가능한 지역들"),
                                        fieldWithPath("schedule").type(JsonFieldType.STRING).description("수업 스케줄"),
                                        fieldWithPath("online").type(JsonFieldType.BOOLEAN).description("온라인 수업 여부. true일 경우 온라인. false일 경우 오프라인"),
                                        fieldWithPath("studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("studentPhone").type(JsonFieldType.STRING).description("학생 연락처"),
                                        fieldWithPath("studentEmail").type(JsonFieldType.STRING).description("학생 이메일"),
                                        fieldWithPath("remarks").type(JsonFieldType.STRING).description("기타 추가사항"),
                                        fieldWithPath("teacherName").type(JsonFieldType.STRING).description("강사 이름")
                                        )
                        )
                        ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT", "ROLE_TEACHER"})
    public void getMatchTest() throws Exception {
        long matchId = 1L;
        long studentId = 1L;
        long teacherId = 1L;
        boolean isOnline = false;
        List<String> subjects = List.of("국어", "영어");
        List<String> regions = List.of("강서", "강남");
        String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";
        String studentName = "김학생";
        String studentPhone = "01012345678";
        String studentEmail = "student@example.com";
        String remarks = "특이사항";

        MatchDto.Response response = MatchDto.Response.builder()
                .id(1L).studentId(studentId).teacherId(teacherId).status(Match.MatchStatus.MATCH_REQUEST)
                .matchSubjects(subjects).matchRegions(regions).schedule(schedule).isOnline(isOnline)
                .studentName(studentName).studentPhone(studentPhone).studentEmail(studentEmail)
                .remarks(remarks).teacherName("박강사")
                .build();

        given(service.getMatch(Mockito.anyLong())).willReturn(new Match());
        given(mapper.matchToResponse(Mockito.any(Match.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/matches/{match-id}", matchId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-match",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("match-id").description("매칭 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 매칭의 식별자"),
                                        fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학생 식별자"),
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("매칭의 상태"),
                                        fieldWithPath("matchSubjects").type(JsonFieldType.ARRAY).description("과목들"),
                                        fieldWithPath("matchRegions").type(JsonFieldType.ARRAY).description("수업 가능한 지역들"),
                                        fieldWithPath("schedule").type(JsonFieldType.STRING).description("수업 스케줄"),
                                        fieldWithPath("online").type(JsonFieldType.BOOLEAN).description("온라인 수업 여부. true일 경우 온라인. false일 경우 오프라인"),
                                        fieldWithPath("studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("studentPhone").type(JsonFieldType.STRING).description("학생 연락처"),
                                        fieldWithPath("studentEmail").type(JsonFieldType.STRING).description("학생 이메일"),
                                        fieldWithPath("remarks").type(JsonFieldType.STRING).description("기타 추가사항"),
                                        fieldWithPath("teacherName").type(JsonFieldType.STRING).description("강사 이름")
                                )
                        )));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT", "ROLE_TEACHER"})
    public void patchMatchTest() throws Exception {
        long matchId = 1L;
        String status = "cancel"; //answer

        MatchDto.Patch request = MatchDto.Patch.builder().id(matchId).status(status).build();

        long studentId = 1L;
        long teacherId = 1L;
        boolean isOnline = false;
        List<String> subjects = List.of("국어", "영어");
        List<String> regions = List.of("강서", "강남");
        String schedule = "9월 19일 화요일 / 13:00 ~ 14:00";
        String studentName = "김학생";
        String studentPhone = "01012345678";
        String studentEmail = "student@example.com";
        String remarks = "특이사항";

        MatchDto.Response response = MatchDto.Response.builder()
                .id(1L).studentId(studentId).teacherId(teacherId).status(Match.MatchStatus.MATCH_CANCELLED)
                .matchSubjects(subjects).matchRegions(regions).schedule(schedule).isOnline(isOnline)
                .studentName(studentName).studentPhone(studentPhone).studentEmail(studentEmail)
                .remarks(remarks).teacherName("박강사")
                .build();

        given(service.patchMatch(Mockito.anyLong(), Mockito.anyString())).willReturn(new Match());
        given(mapper.matchToResponse(Mockito.any(Match.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/matches")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-match",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("매칭의 식별자"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("변경시킬 매칭의 상태. 'cancel'의 경우는 매칭 취소, 'answer'의 경우는 답변 완료 상태")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 매칭의 식별자"),
                                        fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학생 식별자"),
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("매칭의 상태"),
                                        fieldWithPath("matchSubjects").type(JsonFieldType.ARRAY).description("과목들"),
                                        fieldWithPath("matchRegions").type(JsonFieldType.ARRAY).description("수업 가능한 지역들"),
                                        fieldWithPath("schedule").type(JsonFieldType.STRING).description("수업 스케줄"),
                                        fieldWithPath("online").type(JsonFieldType.BOOLEAN).description("온라인 수업 여부. true일 경우 온라인. false일 경우 오프라인"),
                                        fieldWithPath("studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("studentPhone").type(JsonFieldType.STRING).description("학생 연락처"),
                                        fieldWithPath("studentEmail").type(JsonFieldType.STRING).description("학생 이메일"),
                                        fieldWithPath("remarks").type(JsonFieldType.STRING).description("기타 추가사항"),
                                        fieldWithPath("teacherName").type(JsonFieldType.STRING).description("강사 이름")
                                )
                        )));


    }
}
