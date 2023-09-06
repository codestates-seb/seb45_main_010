package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.teacher.dto.TeacherDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.mapper.TeacherMapper;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import com.codestates.connectInstructor.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/teachers")
@Validated
public class TeacherController {
    private final static String TEACHER_DEFAULT_URL = "/teachers";
    private final TeacherService service;
    private final TeacherMapper mapper;

    public TeacherController(TeacherService service, TeacherMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTeacher(@RequestBody @Valid TeacherDto.Post request) {
        Teacher teacher = mapper.postToTeacher(request);
        Teacher created = service.createTeacher(teacher);
        URI location = UriCreator.createUri(TEACHER_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();

    }

    @GetMapping("/verify/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        service.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
