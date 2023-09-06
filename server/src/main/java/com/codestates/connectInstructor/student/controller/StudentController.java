package com.codestates.connectInstructor.student.controller;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.mapper.StudentMapper;
import com.codestates.connectInstructor.student.service.StudentService;
import com.codestates.connectInstructor.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/students")
@Validated
public class StudentController {
    private final static String STUDENT_DEFAULT_URL = "/students";
    private final StudentMapper mapper;
    private final StudentService service;

    public StudentController(StudentMapper mapper, StudentService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postStudent(@RequestBody @Valid StudentDto.Post request) {
        Student student = mapper.postToStudent(request);
        Student created = service.createStudent(student);
        URI location = UriCreator.createUri(STUDENT_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        service.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
