//package com.codestates.connectInstructor.student.controller;
//
//
//import com.codestates.connectInstructor.student.dto.StudentDto;
//import com.codestates.connectInstructor.student.entity.Student;
//import com.codestates.connectInstructor.student.mapper.StudentMapper;
//import com.codestates.connectInstructor.student.service.StudentService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.security.test.context.support.WithAnonymousUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import static org.mockito.BDDMockito.given;
//
//@WebMvcTest(controllers = StudentController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//@AutoConfigureMockMvc(addFilters = false)
//public class StudentControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private StudentMapper mapper;
//    @MockBean
//    private StudentService service;
//    @Autowired
//    private Gson gson;
//
//    @Test
//    @WithAnonymousUser
//    public void postStudentTest() throws Exception {
//        StudentDto.Post request = StudentDto.Post.builder().build();
//        Student student = new Student();
//
//        given(mapper.postToStudent(Mockito.any(StudentDto.Post.class))).willReturn(student);
//        given(service.createStudent(Mockito.any(Student.class))).willReturn(student);
//
//        ResultActions actions = mockMvc.perform(
//                RestDocumentationRequestBuilders.post("/students")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType()
//        )
//    }
//}
