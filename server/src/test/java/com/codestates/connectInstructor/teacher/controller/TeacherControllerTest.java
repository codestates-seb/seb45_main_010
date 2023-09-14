package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.subject.dto.SubjectDto;
import com.codestates.connectInstructor.subject.mapper.SubjectMapper;
import com.codestates.connectInstructor.subject.service.SubjectService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.codestates.connectInstructor.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.connectInstructor.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

@WebMvcTest(controllers = TeacherController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class TeacherControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TeacherMapper teacherMapper;
    @MockBean
    private TeacherService teacherService;

    @Autowired
    private Gson gson;

    @Test
    @WithAnonymousUser
    public void postTeacherTest() throws Exception {
        TeacherDto.Post request = TeacherDto.Post.builder()
                .email("test@example.com")
                .password("test1234")
                .name("테스트")
                .build();

        Teacher teacher = new Teacher();
        teacher.setId(1L);

        given(teacherMapper.postToTeacher(Mockito.any(TeacherDto.Post.class))).willReturn(teacher);
        given(teacherService.createTeacher(Mockito.any(Teacher.class))).willReturn(teacher);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/teachers")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/teachers/"))))
                .andDo(document("post-teacher",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                                )
                        ),
                        responseHeaders(        // (7-6)
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )));
    }

    @Test
    @WithAnonymousUser
    public void patchTeacherTest() throws Exception {
        //give
        //test data
        TeacherDto.Patch patch = new TeacherDto.Patch(1L, "홍길동", "010-1234-5678",
                "프로필 이미지가 저장된 곳 데이터", "안녕하세요. 저는 OO대학교를 졸업하고~~~",
                "OO학원에서 O년을 일했고 ~~", "일주일에 세시간 씩 매일 가능하고 시급은 ~~~",
                "수학 수업의 경우는 고1 과정에서 고3과정의 ~~", true, false, "경기도 용인시 기흥구 ~~");
        String patchContent = gson.toJson(patch);
        List<String> subjects = new ArrayList<>();
        subjects.add("국어");
        subjects.add("영어");
        List<String> regions = new ArrayList<>();
        regions.add("용인시");
        regions.add("수원시");
        List<TeacherDto.MatchResponse> matchResponses = new ArrayList<>();
        matchResponses.add(new TeacherDto.MatchResponse(1L, "홍길동", "9월 19일 화요일 / 13:00 ~ 14:00",
                List.of("영어","수학"), Match.MatchStatus.MATCH_REQUEST));
        matchResponses.add(new TeacherDto.MatchResponse(3L, "임꺽정", "9월 19일 화요일 / 13:00 ~ 14:00",
                List.of("국어","영어"), Match.MatchStatus.MATCH_REQUEST));
        TeacherDto.Response response = new TeacherDto.Response(1L, "hgd@gmail.com",
                "홍길동", true, "010-1234-5678",
                "프로필 이미지가 저장된 곳 데이터", "안녕하세요. 저는 OO대학교를 졸업하고~~~",
                "OO학원에서 O년을 일했고 ~~", "일주일에 세시간 씩 매일 가능하고 시급은 ~~~",
                "수학 수업의 경우는 고1 과정에서 고3과정의 ~~", true, false, "경기도 용인시 기흥구 ~~",
                false, subjects, regions, matchResponses, LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now().minus(1, ChronoUnit.WEEKS));
        //stubbing
        given(teacherMapper.patchToTeacher(Mockito.any(TeacherDto.Patch.class))).willReturn(new Teacher());
        given(teacherService.updateTeacher(Mockito.any(Teacher.class))).willReturn(new Teacher());
        given(teacherMapper.teacherToTeacherResponse(Mockito.any(Teacher.class))).willReturn(response);
        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/teachers/{teacher-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                        // (8) request 전송
                );

        //then
        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("teacher-id").description("수정할 강사 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("수정할 강사의 이름"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("수정할 강사의 전화번호"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("수정할 강사의 프로필 이미지 저장 URL"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("수정할 강사의 자기소개"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("수정할 강사의 경력/이력"),
                                        fieldWithPath("lectureFee").type(JsonFieldType.STRING).description("수정할 강사의 수업료 관련 정보"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업에 대한 설명. 옵션"),
                                        fieldWithPath("onLine").type(JsonFieldType.BOOLEAN).description("온라인 가능 여부"),
                                        fieldWithPath("offLine").type(JsonFieldType.BOOLEAN).description("오프라인 가능 여부"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("수정할 강사의 주소")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("강사의 이메일"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("강사의 이름"),
                                        fieldWithPath("teacher").type(JsonFieldType.BOOLEAN).description("강사인지 여부"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("강사의 전화번호"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("강사의 프로필 이미지 저장 URL"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("강사의 자기소개"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("강사의 경력/이력"),
                                        fieldWithPath("lectureFee").type(JsonFieldType.STRING).description("강사의 수업료 관련 정보"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업에 대한 설명. 옵션"),
                                        fieldWithPath("onLine").type(JsonFieldType.BOOLEAN).description("온라인 가능 여부"),
                                        fieldWithPath("offLine").type(JsonFieldType.BOOLEAN).description("오프라인 가능 여부"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("강사의 주소"),
                                        fieldWithPath("oauth").type(JsonFieldType.BOOLEAN).description("OAuth 회원인지 여부"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들"),
                                        fieldWithPath("matches").type(JsonFieldType.ARRAY).description("매칭 정보 "),
                                        fieldWithPath("matches[].matchId").type(JsonFieldType.NUMBER).description("매칭 식별자"),
                                        fieldWithPath("matches[].studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("matches[].schedule").type(JsonFieldType.STRING).description("스케줄"),
                                        fieldWithPath("matches[].subjects").type(JsonFieldType.ARRAY).description("과목"),
                                        fieldWithPath("matches[].status").type(JsonFieldType.STRING).description("매칭 상태"),
                                        fieldWithPath("lastLogin").type(JsonFieldType.STRING).description("마지막 로그인 일시"),
                                        fieldWithPath("lastModified").type(JsonFieldType.STRING).description("마지막 강사회원 정보 수정 일시"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 가입 일시")
                                )
                        )
                ));

    }

    @Test
    @WithAnonymousUser
    public void getTeacherTest() throws Exception {
        //given
        //test data
        List<String> subjects = new ArrayList<>();
        subjects.add("국어");
        subjects.add("영어");
        List<String> regions = new ArrayList<>();
        regions.add("용인시");
        regions.add("수원시");
        List<TeacherDto.MatchResponse> matchResponses = new ArrayList<>();
        matchResponses.add(new TeacherDto.MatchResponse(1L, "홍길동", "9월 19일 화요일 / 13:00 ~ 14:00",
                List.of("영어","수학"), Match.MatchStatus.MATCH_REQUEST));
        matchResponses.add(new TeacherDto.MatchResponse(3L, "임꺽정", "9월 19일 화요일 / 13:00 ~ 14:00",
                List.of("국어","영어"), Match.MatchStatus.MATCH_REQUEST));
        TeacherDto.Response response = new TeacherDto.Response(1L, "hgd@gmail.com",
                "홍길동", true, "010-1234-5678",
                "프로필 이미지가 저장된 곳 데이터", "안녕하세요. 저는 OO대학교를 졸업하고~~~",
                "OO학원에서 O년을 일했고 ~~", "일주일에 세시간 씩 매일 가능하고 시급은 ~~~",
                "수학 수업의 경우는 고1 과정에서 고3과정의 ~~", true, false, "경기도 용인시 기흥구 ~~",
                false, subjects, regions, matchResponses,  LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now().minus(1, ChronoUnit.WEEKS));
        //stubbing
        given(teacherService.findTeacher(Mockito.anyLong())).willReturn(new Teacher());
        given(teacherMapper.teacherToTeacherResponse(Mockito.any(Teacher.class))).willReturn(response);
        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/teachers/{teacher-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                );
        //then
        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-teacher",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("teacher-id").description("강사 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("강사의 이메일"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("강사의 이름"),
                                        fieldWithPath("teacher").type(JsonFieldType.BOOLEAN).description("강사 여부"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("강사의 전화번호"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("강사의 프로필 이미지 저장 URL"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("강사의 자기소개"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("강사의 경력/이력"),
                                        fieldWithPath("lectureFee").type(JsonFieldType.STRING).description("강사의 수업료 관련 정보"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업에 대한 설명. 옵션"),
                                        fieldWithPath("onLine").type(JsonFieldType.BOOLEAN).description("온라인 가능 여부"),
                                        fieldWithPath("offLine").type(JsonFieldType.BOOLEAN).description("오프라인 가능 여부"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("강사의 주소"),
                                        fieldWithPath("oauth").type(JsonFieldType.BOOLEAN).description("OAuth 회원인지 여부"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들"),
                                        fieldWithPath("matches").type(JsonFieldType.ARRAY).description("매칭 정보 "),
                                        fieldWithPath("matches[].matchId").type(JsonFieldType.NUMBER).description("매칭 식별자"),
                                        fieldWithPath("matches[].studentName").type(JsonFieldType.STRING).description("학생 이름"),
                                        fieldWithPath("matches[].schedule").type(JsonFieldType.STRING).description("스케줄"),
                                        fieldWithPath("matches[].subjects").type(JsonFieldType.ARRAY).description("과목"),
                                        fieldWithPath("matches[].status").type(JsonFieldType.STRING).description("매칭 상태"),
                                        fieldWithPath("lastLogin").type(JsonFieldType.STRING).description("마지막 로그인 일시"),
                                        fieldWithPath("lastModified").type(JsonFieldType.STRING).description("마지막 강사회원 정보 수정 일시"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 가입 일시")
                                )
                        )
                ));
    }

    @Test
    @WithAnonymousUser
    public void getTeachersTest() throws Exception {
        //given
        //test data
        Teacher teacher1 = new Teacher();
        teacher1.setId(1L);
        teacher1.setName("홍길동");
        teacher1.setEmail("hgd@gmail.com");
        teacher1.setOnLine(true);
        teacher1.setOffLine(false);
        teacher1.setOauth(false);
        teacher1.setProfileImg("프로필 이미지가 저장된 곳 데이터");
        Teacher teacher2 = new Teacher();
        teacher2.setId(2L);
        teacher2.setName("임꺽정");
        teacher2.setEmail("lgj@gmail.com");
        teacher2.setOnLine(false);
        teacher2.setOffLine(true);
        teacher2.setOauth(false);
        teacher2.setProfileImg("프로필 이미지가 저장된 곳 데이터");

        Page<Teacher> pageTeachers = new PageImpl<>(
                List.of(teacher1, teacher2),
                PageRequest.of(1, 10, Sort.by("createdAt").descending()),
                2);

        List<String> subjects = new ArrayList<>();
        subjects.add("국어");
        subjects.add("영어");
        List<String> regions = new ArrayList<>();
        regions.add("용인시");
        regions.add("수원시");

        TeacherDto.Element element1 = new TeacherDto.Element();
        element1.setId(1L);
        element1.setOnLine(true);
        element1.setOffLine(false);
        element1.setSubjects(subjects);
        element1.setRegions(regions);
        element1.setName("홍길동");
        element1.setProfileImg("프로필 이미지가 저장된 곳 데이터");
        element1.setCreatedAt(LocalDateTime.now());
        TeacherDto.Element element2 = new TeacherDto.Element();
        element2.setId(2L);
        element2.setOnLine(false);
        element2.setOffLine(true);
        element2.setSubjects(subjects);
        element2.setRegions(regions);
        element2.setName("임꺽정");
        element2.setProfileImg("프로필 이미지가 저장된 곳 데이터");
        element2.setCreatedAt(LocalDateTime.now());

        List<TeacherDto.Element> elements = new ArrayList<>();
        elements.add(element1);
        elements.add(element2);

//        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
//        params.add("teacherName","");
//        params.add("subjectNames", "국어");
//        params.add("regionNames", "용인시");
//        params.add("page","1");
//        params.add("size", "10");

        //stubbing
        given(teacherService.searchTeachers(Mockito.anyString(), Mockito.anyList(), Mockito.anyList(), Mockito.anyInt(), Mockito.anyInt())).willReturn(pageTeachers);
        given(teacherMapper.teachersToTeacherElements(Mockito.anyList())).willReturn(elements);

        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/teachers")
                                .param("teacherName", "")
                                .param("subjectNames", "국어")
                                .param("regionNames", "용인시")
                                .param("page", "1")
                                .param("size", "10")
                                .accept(MediaType.APPLICATION_JSON)
                );
        //then
        actions//.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-teachers",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                        parameterWithName("teacherName").description("강사 이름"),
                                        parameterWithName("subjectNames").description("과목명들"),
                                        parameterWithName("regionNames").description("지역명들"),
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 크기")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("강사 객체 리스트"),
                                        fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("data[].onLine").type(JsonFieldType.BOOLEAN).description("온라인 여부"),
                                        fieldWithPath("data[].offLine").type(JsonFieldType.BOOLEAN).description("오프라인 여부"),
                                        fieldWithPath("data[].subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들"),
                                        fieldWithPath("data[].regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들"),
                                        fieldWithPath("data[].name").type(JsonFieldType.STRING).description("강사 이름"),
                                        fieldWithPath("data[].profileImg").type(JsonFieldType.STRING).description("프로필 이미지 저장 URL"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("강사 회원가입 일시"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수. 모든 강사의 수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                )
                        )
                ));
    }

    @Test
    @WithAnonymousUser
    public void postTeacherRegionTest() throws Exception {
        // given
        // (6) 테스트 데이터

        // (7) Mock 객체를 이용한 Stubbing
        doNothing().when(teacherService).addRegionToTeacher(Mockito.anyLong(), Mockito.anyString());

        // when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/teachers/{teacher-id}/region", 1L)
                                .param("regionName", "대전")
                                .accept(MediaType.APPLICATION_JSON)
                        // (8) request 전송
                );

        // then
        actions
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(document("post-teacher-region",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(parameterWithName("teacher-id").description("지역을 추가할 강사의 식별자")),
                        requestParameters(parameterWithName("regionName").description("지역 이름"))
                        )
                );
    }

    @Test
    @WithAnonymousUser
    public void deleteTeacherRegionTest() throws Exception {
        // given
        // (6) 테스트 데이터

        // (7) Mock 객체를 이용한 Stubbing
        doNothing().when(teacherService).deleteRegionFromTeacher(Mockito.anyLong(), Mockito.anyString());

        // when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/teachers/{teacher-id}/region", 1L)
                                .param("regionName", "대전")
                                .accept(MediaType.APPLICATION_JSON)
                        // (8) request 전송
                );

        // then
        actions
                .andExpect(MockMvcResultMatchers.status().isNoContent())
                .andDo(document("delete-teacher-region",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("teacher-id").description("지역을 삭제할 강사의 식별자")),
                                requestParameters(parameterWithName("regionName").description("지역 이름"))
                        )
                );
    }

    @Test
    @WithAnonymousUser
    public void postTeacherSubjectTest() throws Exception {
        // given
        // (6) 테스트 데이터

        // (7) Mock 객체를 이용한 Stubbing
        doNothing().when(teacherService).addSubjectToTeacher(Mockito.anyLong(), Mockito.anyString());

        // when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/teachers/{teacher-id}/subject", 1L)
                                .param("subjectName", "수학")
                                .accept(MediaType.APPLICATION_JSON)
                        // (8) request 전송
                );

        // then
        actions
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(document("post-teacher-subject",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("teacher-id").description("과목을 삭제할 강사의 식별자")),
                                requestParameters(parameterWithName("subjectName").description("과목 이름"))
                        )
                );
    }

    @Test
    @WithAnonymousUser
    public void deleteTeacherSubjectTest() throws Exception {
        // given
        // (6) 테스트 데이터

        // (7) Mock 객체를 이용한 Stubbing
        doNothing().when(teacherService).deleteSubjectFromTeacher(Mockito.anyLong(), Mockito.anyString());

        // when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/teachers/{teacher-id}/subject", 1L)
                                .param("subjectName", "수학")
                                .accept(MediaType.APPLICATION_JSON)
                        // (8) request 전송
                );

        // then
        actions
                .andExpect(MockMvcResultMatchers.status().isNoContent())
                .andDo(document("delete-teacher-subject",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("teacher-id").description("과목을 삭제할 강사의 식별자")),
                                requestParameters(parameterWithName("subjectName").description("과목 이름"))
                        )
                );
    }

    @Test
    @WithAnonymousUser
    public void verifyEmailTest() throws Exception {
        String email = "test@example.com";

        doNothing().when(teacherService).verifyEmail(anyString());

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

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchPasswordTest() throws Exception {
        long id = 1L;
        String password = "patchPasswordOfTeacher";

        TeacherDto.PatchPassword request = new TeacherDto.PatchPassword(id, password);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setPassword(password);

        given(teacherMapper.patchPasswordToTeacher(Mockito.any(TeacherDto.PatchPassword.class))).willReturn(teacher);
        given(teacherService.updatePassword(Mockito.any(Teacher.class))).willReturn(teacher);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/password")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-password",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("수정할 비밀번호")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchNameTest() throws Exception {
        long id = 1L;
        String name = "홍길동";

        TeacherDto.PatchName request = new TeacherDto.PatchName(id, name);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setName(name);

        given(teacherMapper.patchNameToTeacher(Mockito.any(TeacherDto.PatchName.class))).willReturn(teacher);
        given(teacherService.updateName(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchName(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/name")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-name",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("수정할 이름")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("수정된 이름")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchPhoneTest() throws Exception {
        long id = 1L;
        String phone = "010-1111-2222";

        TeacherDto.PatchPhone request = new TeacherDto.PatchPhone(id, phone);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setPhone(phone);

        given(teacherMapper.patchPhoneToTeacher(Mockito.any(TeacherDto.PatchPhone.class))).willReturn(teacher);
        given(teacherService.updatePhone(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchPhone(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/phone")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-phone",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("수정할 전화번호")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("수정된 전화번호")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchProfileImgTest() throws Exception {
        long id = 1L;
        String profileImg = "프로필 이미지가 저장된 곳";

        TeacherDto.PatchProfileImg request = new TeacherDto.PatchProfileImg(id, profileImg);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setProfileImg(profileImg);

        given(teacherMapper.patchProfileImgToTeacher(Mockito.any(TeacherDto.PatchProfileImg.class))).willReturn(teacher);
        given(teacherService.updateProfileImg(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchProfileImg(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/profileImg")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-profileImg",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("수정할 프로필사진")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("수정된 프로필사진")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchIntroductionTest() throws Exception {
        long id = 1L;
        String introduction = "자기소개 입니다. 저는 OO대학교를 졸업하고 ~~";

        TeacherDto.PatchIntroduction request = new TeacherDto.PatchIntroduction(id, introduction);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setIntroduction(introduction);

        given(teacherMapper.patchIntroductionToTeacher(Mockito.any(TeacherDto.PatchIntroduction.class))).willReturn(teacher);
        given(teacherService.updateIntroduction(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchIntroduction(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/introduction")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-introduction",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("수정할 자기소개")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("수정된 자기소개")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchCareerTest() throws Exception {
        long id = 1L;
        String career = "경력 소개입니다. 저는 OO학원에서 5년을 강사로서~~";

        TeacherDto.PatchCareer request = new TeacherDto.PatchCareer(id, career);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setCareer(career);

        given(teacherMapper.patchCareerToTeacher(Mockito.any(TeacherDto.PatchCareer.class))).willReturn(teacher);
        given(teacherService.updateCareer(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchCareer(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/career")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-career",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("수정할 경력/이력")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("career").type(JsonFieldType.STRING).description("수정된 경력/이력")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchLectureFeeTest() throws Exception {
        long id = 1L;
        String lectureFee = "수업료 관련 소개입니다. 저는 강의 시급을 4만원 정도~~~";

        TeacherDto.PatchLectureFee request = new TeacherDto.PatchLectureFee(id, lectureFee);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setLectureFee(lectureFee);

        given(teacherMapper.patchLectureFeeToTeacher(Mockito.any(TeacherDto.PatchLectureFee.class))).willReturn(teacher);
        given(teacherService.updateLectureFee(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchLectureFee(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/lectureFee")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-lectureFee",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("lectureFee").type(JsonFieldType.STRING).description("수정할 수업료 관련 정보")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("lectureFee").type(JsonFieldType.STRING).description("수정된 수업료 관련 정보")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchOptionTest() throws Exception {
        long id = 1L;
        String option = "수업 옵션 입니다.";

        TeacherDto.PatchOption request = new TeacherDto.PatchOption(id, option);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setOption(option);

        given(teacherMapper.patchOptionToTeacher(Mockito.any(TeacherDto.PatchOption.class))).willReturn(teacher);
        given(teacherService.updateOption(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchOption(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/option")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-option",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수정할 수업옵션, 설명")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수정된 수업옵션, 설명")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchOnLineTest() throws Exception {
        long id = 1L;
        boolean onLine = false;

        TeacherDto.PatchOnLine request = new TeacherDto.PatchOnLine(id, onLine);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setOnLine(onLine);

        given(teacherMapper.patchOnLineToTeacher(Mockito.any(TeacherDto.PatchOnLine.class))).willReturn(teacher);
        given(teacherService.updateOnLine(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchOnLine(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/onLine")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-onLine",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("onLine").type(JsonFieldType.BOOLEAN).description("수정할 온라인 수업 가능여부")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("onLine").type(JsonFieldType.BOOLEAN).description("수정된 온라인 수업 가능여부")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchOffLineTest() throws Exception {
        long id = 1L;
        boolean offLine = true;

        TeacherDto.PatchOffLine request = new TeacherDto.PatchOffLine(id, offLine);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setOffLine(offLine);

        given(teacherMapper.patchOffLineToTeacher(Mockito.any(TeacherDto.PatchOffLine.class))).willReturn(teacher);
        given(teacherService.updateOffLine(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchOffLine(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/offLine")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-offLine",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("offLine").type(JsonFieldType.BOOLEAN).description("수정할 오프라인 수업 가능여부")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("offLine").type(JsonFieldType.BOOLEAN).description("수정된 오프라인 수업 가능여부")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchAddressTest() throws Exception {
        long id = 1L;
        String address = "경기도 수원시 팔달구 효원로307번길 20";

        TeacherDto.PatchAddress request = new TeacherDto.PatchAddress(id, address);

        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setAddress(address);

        given(teacherMapper.patchAddressToTeacher(Mockito.any(TeacherDto.PatchAddress.class))).willReturn(teacher);
        given(teacherService.updateAddress(Mockito.any(Teacher.class))).willReturn(teacher);
        given(teacherMapper.teacherToPatchAddress(Mockito.any(Teacher.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/address")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-address",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("수정할 주소(강사 사는 곳)")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("address").type(JsonFieldType.STRING).description("수정된 주소(강사 사는 곳)")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchSubjectTest() throws Exception {
        long id = 1L;
        List<String> subjects = List.of("국어", "영어");

        TeacherDto.PatchSubject patchSubject = new TeacherDto.PatchSubject(id, subjects);

        given(teacherService.updateSubject(Mockito.anyLong(), Mockito.anyList())).willReturn(new Teacher());
        given(teacherMapper.teacherToPatchSubject(Mockito.any(Teacher.class))).willReturn(patchSubject);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/subjects")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(patchSubject))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-subjects",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사의 모든 과목")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사의 모든 과목")
                                )
                        )
                ));
    }
    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchRegionTest() throws Exception {
        long id = 1L;
        List<String> regions = List.of("강남", "강서");

        TeacherDto.PatchRegion patchRegion = new TeacherDto.PatchRegion(id, regions);

        given(teacherService.updateRegion(Mockito.anyLong(), Mockito.anyList())).willReturn(new Teacher());
        given(teacherMapper.teacherToPatchRegion(Mockito.any(Teacher.class))).willReturn(patchRegion);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/teachers/regions")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(patchRegion))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-teacher-regions",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사의 모든 지역")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("강사회원 식별자"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사의 모든 지역")
                                )
                        )
                ));
    }
}