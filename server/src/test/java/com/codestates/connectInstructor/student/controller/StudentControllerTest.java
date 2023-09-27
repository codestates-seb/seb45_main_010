package com.codestates.connectInstructor.student.controller;


import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.mapper.StudentMapper;
import com.codestates.connectInstructor.student.service.StudentService;
import com.codestates.connectInstructor.subject.entity.Subject;
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
        student.setId(1L);

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

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchLessonOptionTest() throws Exception {
        long id = 1L;
        String option = "수업옵션";

        StudentDto.PatchLessonOption request = StudentDto.PatchLessonOption.builder().id(id).option(option).build();

        Student student = new Student();
        student.setId(id);
        student.setOption(option);

        given(mapper.patchPatchLessonOptionToStudent(Mockito.any(StudentDto.PatchLessonOption.class))).willReturn(student);
        given(service.updateLessonOption(Mockito.any(Student.class))).willReturn(student);
        given(mapper.studentToPatchLessonOption(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/option")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-lessonOption",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업옵션")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업옵션 수정 후")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchNameTest() throws Exception {
        long id = 1L;
        String name = "수정된 이름";

        StudentDto.PatchName request = StudentDto.PatchName.builder().id(id).name(name).build();

        Student student = new Student();
        student.setId(id);
        student.setName(name);

        given(mapper.patchNameToStudent(Mockito.any(StudentDto.PatchName.class))).willReturn(student);
        given(service.updateName(Mockito.any(Student.class))).willReturn(student);
        given(mapper.studentToPatchName(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/name")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-name",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름 수정 후")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchPasswordTest() throws Exception {
        long id = 1L;
        String password = "afterpatch1";

        StudentDto.PatchPassword request = StudentDto.PatchPassword.builder().id(id).password(password).build();

        Student student = new Student();
        student.setId(id);
        student.setPassword(password);

        given(mapper.patchPasswordToStudent(Mockito.any(StudentDto.PatchPassword.class))).willReturn(student);
        given(service.updatePassword(Mockito.any(Student.class))).willReturn(student);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/password")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-password",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("수정할 비밀번호")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchPhoneNumberTest() throws Exception {
        long id = 1L;
        String phone = "01012345678";

        StudentDto.PatchPhoneNumber request = StudentDto.PatchPhoneNumber.builder().id(id).phone(phone).build();

        Student student = new Student();
        student.setId(id);
        student.setPhone(phone);

        given(mapper.patchPhoneNumberToStudent(Mockito.any(StudentDto.PatchPhoneNumber.class))).willReturn(student);
        given(service.updatePhoneNumber(Mockito.any(Student.class))).willReturn(student);
        given(mapper.studentToPatchPhoneNumber(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/phone")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-phoneNumber",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("연락처")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("연락처 수정 후")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchSubjectTest() throws Exception {
        long id = 1L;
        List<String> subjects = List.of("국어", "영어");

        StudentDto.PatchSubject request = StudentDto.PatchSubject.builder().id(id).subjects(subjects).build();

        Student student = new Student();
        student.setId(id);

        given(service.updateSubject(Mockito.anyLong(), Mockito.anyList())).willReturn(student);
        given(mapper.studentToPatchSubject(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/subjects")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-subjects",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("학생의 모든 관심 과목")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("학생의 모든 관심 과목")
                                )
                        )
                ));
    }

    @Test
    @WithAnonymousUser
    public void getSimpleStudentTest() throws Exception {
        long id = 1L;
        String email = "test@example.com";
        String name = "테스트";
        String profileImg = "프로필 이미지. 미구현";
        String phone = "01012345678";
        boolean isOauth = false;
        boolean teacher = false;
        MemberStatus status = MemberStatus.ACTIVE;

        Student student = new Student();
        student.setEmail(email);
        student.setName(name);
        student.setProfileImg(profileImg);
        student.setPhone(phone);
        student.setOauth(isOauth);
        student.setStatus(status);

        StudentDto.SimpleResponse response = StudentDto.SimpleResponse.builder()
                .id(id).email(email).name(name).profileImg(profileImg).phone(phone).isOauth(isOauth).status(status)
                .build();

        given(service.findStudentById(Mockito.anyLong())).willReturn(student);
        given(mapper.studentToSimpleResponse(Mockito.any(Student.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/students/{student-id}", id)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-simple",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("student-id").description("회원 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("프로필 사진 링크. 미구현"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("연락처"),                                        fieldWithPath("oauth").type(JsonFieldType.BOOLEAN).description("소셜 회원가입 여부. true면 소셜 회원, false면 자체 가입 회원"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("teacher").type(JsonFieldType.BOOLEAN).description("강사 여부. false면 학생")
                                )
                        )
                        ));

    }

    @Test
    @WithMockUser(authorities = {"ROLE_STUDENT"})
    public void patchRegionTest() throws Exception {
        long id = 1L;
        List<String> regions = List.of("강남", "강서");

        StudentDto.PatchRegion request = StudentDto.PatchRegion.builder().id(id).regions(regions).build();

        Student student = new Student();
        student.setId(id);

        given(service.updateRegion(Mockito.anyLong(), Mockito.anyList())).willReturn(student);
        given(mapper.studentToPatchRegion(Mockito.any(Student.class))).willReturn(request);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/students/regions")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-regions",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("학생의 모든 지역")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("수정 후, 학생의 모든 지역")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser("ROLE_STUDENT")
    public void getStudentTest() throws Exception {
        long id = 1L;
        String name = "테스트";
        String email = "test@example.com";
        String profileImg = "프로필 이미지. 미구현";
        String introduction = "자기소개";
        String option = "수업옵션";
        String phone = "01012345678";
        boolean isOauth = false;
        boolean teacher = false;
        MemberStatus status = MemberStatus.ACTIVE;
        List<String> subjects = List.of("국어", "수학");
        List<String> regions = List.of("강서", "강남");
        List<StudentDto.MatchResponse> matches = List.of(
                StudentDto.MatchResponse.builder()
                    .matchId(1L)
                    .teacherName("김강사")
                    .date("2023-09-16")
                        .timeslot("오후 03:00~오후 04:00")
                    .subjects(subjects)
                    .status(Match.MatchStatus.MATCH_REQUEST)
                    .build(),
                StudentDto.MatchResponse.builder()
                        .matchId(2L)
                        .teacherName("박선생")
                        .date("2023-09-16")
                        .timeslot("오후 03:00~오후 04:00")
                        .subjects(subjects)
                        .status(Match.MatchStatus.MATCH_ANSWERED)
                        .build());

        Student student = new Student();
        student.setEmail(email);
        student.setName(name);
        student.setProfileImg(profileImg);
        student.setPhone(phone);
        student.setOauth(isOauth);
        student.setStatus(status);

        StudentDto.DetailResponse response = StudentDto.DetailResponse.builder()
                .id(id).email(email).name(name).profileImg(profileImg).phone(phone).isOauth(isOauth).status(status).introduction(introduction).option(option).status(status).subjects(subjects).regions(regions).matches(matches)
                .build();

        given(service.findStudentById(Mockito.anyLong())).willReturn(student);
        given(mapper.studentToDetailResponse(Mockito.any(Student.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/students/mypage/{student-id}", id)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-detail-student",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("student-id").description("회원 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("프로필 사진 링크. 미구현"),
                                        fieldWithPath("introduction").type(JsonFieldType.STRING).description("자기소개"),
                                        fieldWithPath("option").type(JsonFieldType.STRING).description("수업옵션"),
                                        fieldWithPath("oauth").type(JsonFieldType.BOOLEAN).description("소셜 회원 여부. true일 경우 소셜 회원"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("연락처"),                                        fieldWithPath("oauth").type(JsonFieldType.BOOLEAN).description("소셜 회원가입 여부. true면 소셜 회원, false면 자체 가입 회원"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("subjects").type(JsonFieldType.ARRAY).description("회원 관심 과목"),
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("회원 지역"),
                                        fieldWithPath("teacher").type(JsonFieldType.BOOLEAN).description("강사여부. false면 학생"),
                                        fieldWithPath("matches").type(JsonFieldType.ARRAY).description("매칭 정보"),
                                        fieldWithPath("matches[].matchId").type(JsonFieldType.NUMBER).description("매칭 식별자"),
                                        fieldWithPath("matches[].teacherName").type(JsonFieldType.STRING).description("강사 이름"),
                                        fieldWithPath("matches[].date").type(JsonFieldType.STRING).description("수업 날짜"),
                                        fieldWithPath("matches[].timeslot").type(JsonFieldType.STRING).description("수업 시간"),
                                        fieldWithPath("matches[].subjects").type(JsonFieldType.ARRAY).description("과목"),
                                        fieldWithPath("matches[].status").type(JsonFieldType.STRING).description("매칭 상태")
                                )
                        )
                ));

    }
}

