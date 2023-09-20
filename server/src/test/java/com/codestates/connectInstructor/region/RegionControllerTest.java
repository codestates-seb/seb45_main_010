package com.codestates.connectInstructor.region;

import com.codestates.connectInstructor.region.controller.RegionController;
import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
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

//@WebMvcTest(RegionController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
@WebMvcTest(RegionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class RegionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RegionService regionService;

    @MockBean
    private RegionMapper regionMapper;

    @Autowired
    private Gson gson;

    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void postRegionTest() throws Exception {
        //given
        //test data
        RegionDto.Post post = new RegionDto.Post("인천");
        String postContent = gson.toJson(post);
        Region region = new Region();
        region.setId(1L);
        //stubbing
        given(regionMapper.regionPostToRegion(Mockito.any(RegionDto.Post.class))).willReturn(new Region());
        given(regionService.createRegion(Mockito.any(Region.class))).willReturn(region);
        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/regions")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postContent)
                );
        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/regions/"))))
                .andDo(document(       // (7)
                        "post-region",     // (7-1)
                        getRequestPreProcessor(),      // (7-2)
                        getResponsePreProcessor(),     // (7-3)
                        requestFields(             // (7-4)
                                List.of(
                                        fieldWithPath("regionName").type(JsonFieldType.STRING).description("지역명") // (7-5)
                                )
                        ),
                        responseHeaders(        // (7-6)
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void getRegionsTest() throws Exception {
        //given
        //test data
        RegionDto.Response response1 = new RegionDto.Response(1L, "인천");
        RegionDto.Response response2 = new RegionDto.Response(2L, "대전");
        List<RegionDto.Response> responses = new ArrayList<>();
        responses.add(response1);
        responses.add(response2);
        //stubbing
        given(regionService.findRegions()).willReturn(new ArrayList<Region>());
        given(regionMapper.regionsToRegionResponses(Mockito.anyList())).willReturn(responses);
        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/regions")
                                .accept(MediaType.APPLICATION_JSON)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-regions",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        responseFields(
                                List.of(
                                        fieldWithPath("regions").type(JsonFieldType.ARRAY).description("현재 사용자가 등록/삭제 가능한 모든 정식 지역들 리스트"),
                                        fieldWithPath("regions[].id").type(JsonFieldType.NUMBER).description("지역 식별자"),
                                        fieldWithPath("regions[].regionName").type(JsonFieldType.STRING).description("지역명")
                                )
                        )

                ));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void deleteRegionWithIdTest() throws Exception {
        //given
        long regionId = 1;
        doNothing().when(regionService).deleteRegion(Mockito.anyLong());
        //when
        ResultActions actions =
                mockMvc.perform(delete("/regions/{region-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON));
        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-region-with-id",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(parameterWithName("region-id").description("지역 식별자"))));
    }
    @Test@WithMockUser(authorities = {"ROLE_TEACHER"})
    public void deleteRegionWithNameTest() throws Exception {
        //given
        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("regionName","인천");
        doNothing().when(regionService).deleteRegion(Mockito.anyString());

        //when
        ResultActions actions =
                mockMvc.perform(delete("/regions")
                        .accept(MediaType.APPLICATION_JSON)
                        .params(params));
        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-region-with-name",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(parameterWithName("regionName").description("지역 이름"))));
    }

}
