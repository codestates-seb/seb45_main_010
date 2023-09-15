package com.codestates.connectInstructor.schedule;

import com.codestates.connectInstructor.schedule.controller.ScheduleController;
import com.codestates.connectInstructor.schedule.dto.ScheduleDto;
import com.codestates.connectInstructor.schedule.entity.Schedule;
import com.codestates.connectInstructor.schedule.mapper.ScheduleMapper;
import com.codestates.connectInstructor.schedule.service.ScheduleService;
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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;

@WebMvcTest(controllers = ScheduleController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class ScheduleControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ScheduleMapper mapper;
    @MockBean
    private ScheduleService service;

    @Test
    @WithMockUser(authorities = {"ROLE_TEACHER"})
    public void patchScheduleTest() throws Exception {
        long teacherId = 1L;
        String date = "2023-09-15";
        List<String> timeslots = List.of( "오후 02:00~오후 03:00", "오후 03:00~오후 04:00", "오후 06:00~오후 07:00");

        ScheduleDto.Single response = ScheduleDto.Single.builder()
                .teacherId(teacherId)
                .date(date)
                .timeslots(timeslots)
                .build();

        Schedule schedule = new Schedule();

        given(mapper.singleToSchedule(Mockito.any(ScheduleDto.Single.class))).willReturn(schedule);
        given(service.updateSchedule(Mockito.any(Schedule.class), Mockito.anyLong())).willReturn(schedule);
        given(mapper.scheduleToSingle(Mockito.any(Schedule.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch("/schedules")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(response))
        );

        actions
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("patch-schedule",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("date").type(JsonFieldType.STRING).description("수정하고자하는 날짜"),
                                        fieldWithPath("timeslots").type(JsonFieldType.ARRAY).description("수정하고자하는 날짜에 포함될 모든 시간대들")
                                )
                        ),
                        responseFields(
                                List.of(fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("date").type(JsonFieldType.STRING).description("수정된 날짜"),
                                        fieldWithPath("timeslots").type(JsonFieldType.ARRAY).description("수정된 날짜에 포함된 모든 시간대들")
                                )
                        )
                        ));
    }

    @Test
    @WithAnonymousUser
    public void getAllSchuduleTest() throws Exception {
        long teacherId = 1L;
        String date = "2023-09-15";
        String date2 = "2023-09-16";
        List<String> timeslots = List.of( "오후 02:00~오후 03:00", "오후 03:00~오후 04:00", "오후 06:00~오후 07:00");
        List<String> timeslots2 = List.of("오후 03:00~오후 04:00", "오후 04:00~오후 05:00");

        ScheduleDto.Multiple response = ScheduleDto.Multiple.builder()
                .teacherId(teacherId)
                .schedules(List.of(
                        ScheduleDto.Data.builder()
                                .date(date)
                                .timeslots(timeslots)
                                .build(),
                        ScheduleDto.Data.builder()
                                .date(date2)
                                .timeslots(timeslots2)
                                .build()
                        )
                )
                .build();

        Schedule schedule = new Schedule();
        List<Schedule> scheduleList = List.of(schedule);

        given(service.getAllSchedule(Mockito.anyLong())).willReturn(scheduleList);
        given(mapper.schedulesToMultiple(Mockito.anyList(), Mockito.anyLong())).willReturn(response);

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/schedules")
                        .param("teacherId", String.valueOf(teacherId))
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("get-schedule",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                        parameterWithName("teacherId").description("강사 식별자")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("teacherId").type(JsonFieldType.NUMBER).description("강사 식별자"),
                                        fieldWithPath("schedules").type(JsonFieldType.ARRAY).description("스케줄 데이터"),
                                        fieldWithPath("schedules[].date").type(JsonFieldType.STRING).description("날짜"),
                                        fieldWithPath("schedules[].timeslots").type(JsonFieldType.ARRAY).description("시간대")
                                )
                        )
                        ));

    }
}
