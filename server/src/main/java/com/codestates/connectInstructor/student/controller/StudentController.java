package com.codestates.connectInstructor.student.controller;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.mapper.StudentMapper;
import com.codestates.connectInstructor.student.service.StudentService;
import com.codestates.connectInstructor.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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

    //student에 둘 게 아니라 common으로 옮겨야하나?
    @GetMapping("/check/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        boolean isUsed = service.checkUsedEmail(email);

        StudentDto.EmailCheck response = StudentDto.EmailCheck.builder().isUsed(isUsed).build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/introduction")
    public ResponseEntity patchIntroduction(@RequestBody @Valid StudentDto.PatchIntroduction request) {
        Student student = mapper.patchIntroductionToStudent(request);

        Student updated = service.updateIntroduction(student);

        StudentDto.PatchIntroduction response = mapper.studentToPatchIntroduction(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/lessonOption")
    public ResponseEntity patchIntroduction(@RequestBody @Valid StudentDto.PatchLessonOption request) {
        Student student = mapper.patchPatchLessonOptionToStudent(request);

        Student updated = service.updateLessonOption(student);

        StudentDto.PatchLessonOption response = mapper.studentToPatchLessonOption(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{student-id}")
    public ResponseEntity deleteStudent(@PathVariable("student-id") @Positive long studentId) {
        service.deleteStudent(studentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/name")
    public ResponseEntity patchName(@RequestBody @Valid StudentDto.PatchName request) {
        Student student = mapper.patchNameToStudent(request);

        Student updated = service.updateName(student);

        StudentDto.PatchName response = mapper.studentToPatchName(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity patchPassword(@RequestBody @Valid StudentDto.PatchPassword request) {
        Student student = mapper.patchPasswordToStudent(request);

        Student updated = service.updatePassword(student);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/phoneNumber")
    public ResponseEntity patchPhoneNumber(@RequestBody @Valid StudentDto.PatchPhoneNumber request) {
        Student student = mapper.patchPhoneNumberToStudent(request);

        Student updated = service.updatePhoneNumber(student);

        StudentDto.PatchPhoneNumber response = mapper.studentToPatchPhoneNumber(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/subjects")
    public ResponseEntity patchSubject(@RequestBody @Valid StudentDto.PatchSubject request) {

        Student updated = service.updateSubject(request.getId(), request.getSubjects());

        StudentDto.PatchSubject response = mapper.studentToPatchSubject(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("{student-id}")
    public ResponseEntity getSimpleStudent(@PathVariable("student-id") @Positive long id) {
        Student student = service.findStudentById(id);

        StudentDto.SimpleResponse response = mapper.studentToSimpleResponse(student);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/regions")
    public ResponseEntity patchRegions(@RequestBody @Valid StudentDto.PatchRegion request) {
        Student student = service.updateRegion(request.getId(), request.getRegions());

        StudentDto.PatchRegion response = mapper.studentToPatchRegion(student);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/mypage/{student-id}")
    public ResponseEntity getStudent(@PathVariable("student-id") long id) {
        Student student = service.findStudentById(id);
        StudentDto.DetailResponse response = mapper.studentToDetailResponse(student);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
