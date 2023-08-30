package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.mapper.TeacherMapper;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/teachers")
@Validated
public class TeacherController {
    private final TeacherService service;
    private final TeacherMapper mapper;

    public TeacherController(TeacherService service, TeacherMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTeacher(@RequestBody @Valid StudentDto.Post request) {
        Teacher teacher = mapper.postToTeacher(request);
        Teacher created = service.createTeacher(teacher);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        service.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
