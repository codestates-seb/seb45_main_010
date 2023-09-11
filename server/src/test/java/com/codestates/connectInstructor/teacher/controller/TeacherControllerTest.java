package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
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
    @MockBean
    private SubjectService subjectService;
    @MockBean
    private SubjectMapper subjectMapper;
    @MockBean
    private RegionService regionService;
    @MockBean
    private RegionMapper regionMapper;
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
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")//,
        //                                fieldWithPath("introduction").type(JsonFieldType.STRING).description("자기소개"),
        //                                fieldWithPath("career").type(JsonFieldType.STRING).description("경력"),
        //                                fieldWithPath("address").type(JsonFieldType.STRING).description("주소")
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
        SubjectDto.Response subject1 = new SubjectDto.Response(1L, "국어");
        SubjectDto.Response subject2 = new SubjectDto.Response(2L, "영어");
        List<SubjectDto.Response> subjects = new ArrayList<>();
        subjects.add(subject1);
        subjects.add(subject2);
        RegionDto.Response region1 = new RegionDto.Response(1L, "용인시");
        RegionDto.Response region2 = new RegionDto.Response(2L, "수원시");
        List<RegionDto.Response> regions = new ArrayList<>();
        regions.add(region1);
        regions.add(region2);
        TeacherDto.Response response = new TeacherDto.Response(1L,"hgd@gmail.com",
                "홍길동","010-1234-5678",
                "프로필 이미지가 저장된 곳 데이터", "안녕하세요. 저는 OO대학교를 졸업하고~~~",
                "OO학원에서 O년을 일했고 ~~", "일주일에 세시간 씩 매일 가능하고 시급은 ~~~",
                "수학 수업의 경우는 고1 과정에서 고3과정의 ~~", true, false, "경기도 용인시 기흥구 ~~",
                false, subjects, regions, LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now().minus(1, ChronoUnit.WEEKS));
            //stubbing
        given(teacherMapper.patchToTeacher(Mockito.any(TeacherDto.Patch.class))).willReturn(new Teacher());
        given(teacherService.updateTeacher(Mockito.any(Teacher.class))).willReturn(new Teacher());
        given(teacherMapper.teacherToTeacherResponse(Mockito.any(Teacher.class),Mockito.any(SubjectService.class),Mockito.any(RegionService.class),Mockito.any(SubjectMapper.class),Mockito.any(RegionMapper.class))).willReturn(response);
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
                .andDo(document( "patch-teacher",
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
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들 객체 리스트"),
                                        fieldWithPath("subjects[].id").type(JsonFieldType.NUMBER).description("과목 식별자"),
                                        fieldWithPath("subjects[].subjectName").type(JsonFieldType.STRING).description("과목 이름"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들 객체 리스트"),
                                        fieldWithPath("regions[].id").type(JsonFieldType.NUMBER).description("지역 식별자"),
                                        fieldWithPath("regions[].regionName").type(JsonFieldType.STRING).description("지역 이름"),
                                        fieldWithPath("lastLogin").type(JsonFieldType.STRING).description("마지막 로그인 일시"),
                                        fieldWithPath("lastModified").type(JsonFieldType.STRING).description("마지막 강사회원 정보 수정 일시"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 가입 일시")
                                )
                        )
                ));

    }
    @Test
    @WithAnonymousUser
    public void getTeacherTest() throws Exception{
        //given
            //test data
        SubjectDto.Response subject1 = new SubjectDto.Response(1L, "국어");
        SubjectDto.Response subject2 = new SubjectDto.Response(2L, "영어");
        List<SubjectDto.Response> subjects = new ArrayList<>();
        subjects.add(subject1);
        subjects.add(subject2);
        RegionDto.Response region1 = new RegionDto.Response(1L, "용인시");
        RegionDto.Response region2 = new RegionDto.Response(2L, "수원시");
        List<RegionDto.Response> regions = new ArrayList<>();
        regions.add(region1);
        regions.add(region2);
        TeacherDto.Response response = new TeacherDto.Response(1L,"hgd@gmail.com",
                "홍길동","010-1234-5678",
                "프로필 이미지가 저장된 곳 데이터", "안녕하세요. 저는 OO대학교를 졸업하고~~~",
                "OO학원에서 O년을 일했고 ~~", "일주일에 세시간 씩 매일 가능하고 시급은 ~~~",
                "수학 수업의 경우는 고1 과정에서 고3과정의 ~~", true, false, "경기도 용인시 기흥구 ~~",
                false, subjects, regions, LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now().minus(1, ChronoUnit.WEEKS));
            //stubbing
        given(teacherService.findTeacher(Mockito.anyLong())).willReturn(new Teacher());
        given(teacherMapper.teacherToTeacherResponse(Mockito.any(Teacher.class),Mockito.any(SubjectService.class),Mockito.any(RegionService.class),Mockito.any(SubjectMapper.class),Mockito.any(RegionMapper.class))).willReturn(response);
        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/teachers/{teacher-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                );
        //then
        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document( "get-teacher",
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
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들 객체 리스트"),
                                        fieldWithPath("subjects[].id").type(JsonFieldType.NUMBER).description("과목 식별자"),
                                        fieldWithPath("subjects[].subjectName").type(JsonFieldType.STRING).description("과목 이름"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들 객체 리스트"),
                                        fieldWithPath("regions[].id").type(JsonFieldType.NUMBER).description("지역 식별자"),
                                        fieldWithPath("regions[].regionName").type(JsonFieldType.STRING).description("지역 이름"),
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
                PageRequest.of( 1, 10, Sort.by("createdAt").descending()),
                2);

        SubjectDto.Response subject1 = new SubjectDto.Response(1L, "국어");
        SubjectDto.Response subject2 = new SubjectDto.Response(2L, "영어");
        List<SubjectDto.Response> subjects = new ArrayList<>();
        subjects.add(subject1);
        subjects.add(subject2);
        RegionDto.Response region1 = new RegionDto.Response(1L, "용인시");
        RegionDto.Response region2 = new RegionDto.Response(2L, "수원시");
        List<RegionDto.Response> regions = new ArrayList<>();
        regions.add(region1);
        regions.add(region2);
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
        given(teacherService.searchTeachers(Mockito.anyString(),Mockito.anyList(),Mockito.anyList(),Mockito.anyInt(),Mockito.anyInt())).willReturn(pageTeachers);
        given(teacherMapper.teachersToTeacherElements(Mockito.anyList(),Mockito.any(SubjectService.class),Mockito.any(RegionService.class),Mockito.any(SubjectMapper.class),Mockito.any(RegionMapper.class))).willReturn(elements);

        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/teachers")
                                .param("teacherName", "")
                                .param("subjectNames", "국어")
                                .param("regionNames","용인시")
                                .param("page","1")
                                .param("size", "10")
                                .accept(MediaType.APPLICATION_JSON)
                );
        //then
        actions//.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-teachers",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("teacherName").description("강사 이름"),
                                parameterWithName("subjectNames").description("과목명"),
                                parameterWithName("regionNames").description("지역명"),
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("강사 객체 리스트"),
                                        fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("data[].onLine").type(JsonFieldType.BOOLEAN).description("온라인 여부"),
                                        fieldWithPath("data[].offLine").type(JsonFieldType.BOOLEAN).description("오프라인 여부"),
                                        fieldWithPath("data[].subjects").type(JsonFieldType.ARRAY).description("강사가 가능한 과목들 객체 리스트"),
                                        fieldWithPath("data[].subjects[].id").type(JsonFieldType.NUMBER).description("과목 식별자"),
                                        fieldWithPath("data[].subjects[].subjectName").type(JsonFieldType.STRING).description("과목 이름"),
                                        fieldWithPath("data[].regions").type(JsonFieldType.ARRAY).description("강사가 가능한 지역들 객체 리스트"),
                                        fieldWithPath("data[].regions[].id").type(JsonFieldType.NUMBER).description("지역 식별자"),
                                        fieldWithPath("data[].regions[].regionName").type(JsonFieldType.STRING).description("지역 이름"),
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
    public void verifyEmailTest() throws Exception{
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
}
