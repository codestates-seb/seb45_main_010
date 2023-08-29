package com.codestates.connectInstructor.student.controller;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.mapper.StudentMapper;
import com.codestates.connectInstructor.student.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/students")
@Validated
public class StudentController {
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

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        service.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
