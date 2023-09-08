package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.subject.mapper.SubjectMapper;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.dto.TeacherDto;
import com.codestates.connectInstructor.teacher.dto.TeacherListDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.mapper.TeacherMapper;
import com.codestates.connectInstructor.teacher.service.TeacherService;
import com.codestates.connectInstructor.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/teachers")
@Validated
public class TeacherController {
    private final static String TEACHER_DEFAULT_URL = "/teachers";
    private final TeacherService teacherService;
    private final TeacherMapper teacherMapper;
    private final SubjectService subjectService;
    private final SubjectMapper subjectMapper;
    private final RegionService regionService;
    private final RegionMapper regionMapper;

    public TeacherController(TeacherService teacherService, TeacherMapper teacherMapper,
                             SubjectService subjectService, SubjectMapper subjectMapper,
                             RegionService regionService, RegionMapper regionMapper) {
        this.teacherService = teacherService;
        this.teacherMapper = teacherMapper;
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
        this.regionService = regionService;
        this.regionMapper = regionMapper;
    }

    @PostMapping
    public ResponseEntity postTeacher(@RequestBody @Valid TeacherDto.Post request) {
        Teacher teacher = teacherMapper.postToTeacher(request);
        Teacher created = teacherService.createTeacher(teacher);
        URI location = UriCreator.createUri(TEACHER_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();

    }
    @PostMapping("/{teacher-id}/subject")
    public ResponseEntity postTeacherSubject(@PathVariable("teacher-id") @Positive long teacherId,
                                             @RequestParam String subjectName){
        teacherService.addSubjectToTeacher(teacherId, subjectName);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/{teacher-id}/subject")
    public ResponseEntity deleteTeacherSubject(@PathVariable("teacher-id") @Positive long teacherId,
                                             @RequestParam String subjectName){
        teacherService.deleteSubjectFromTeacher(teacherId, subjectName);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{teacher-id}")
    public ResponseEntity patchTeacher(@PathVariable("teacher-id") @Positive long teacherId,
                                       @Valid @RequestBody TeacherDto.Patch requestBody){
        requestBody.setId(teacherId);
        Teacher teacher = teacherMapper.patchToTeacher(requestBody);
        Teacher updated = teacherService.updateTeacher(teacher);
        TeacherDto.Response response = teacherMapper.teacherToTeacherResponse(updated,
                subjectService, regionService, subjectMapper, regionMapper);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/{teacher-id}")
    public ResponseEntity getTeacher(@PathVariable("teacher-id") @Positive long teacherId){
        Teacher teacher = teacherService.findTeacher(teacherId);
        TeacherDto.Response response = teacherMapper.teacherToTeacherResponse(teacher,
                subjectService, regionService, subjectMapper, regionMapper);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getTeachers(@RequestParam(required = false) String teacherName,
                                      @RequestParam(required = false) List<String> subjectNames,
                                      @RequestParam(required = false) List<String> regionNames,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Teacher> pageTeachers = teacherService.searchTeachers(teacherName, subjectNames, regionNames,page-1, size);
        List<Teacher> teachers = pageTeachers.getContent();

        return new ResponseEntity<>(
                new TeacherListDto<>(teacherMapper.teachersToTeacherElements(teachers,
                        subjectService, regionService, subjectMapper, regionMapper),
                        pageTeachers),HttpStatus.OK);

    }

    @GetMapping("/verify/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        teacherService.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
