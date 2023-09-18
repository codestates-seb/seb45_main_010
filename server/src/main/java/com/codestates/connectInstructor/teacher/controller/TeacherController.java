package com.codestates.connectInstructor.teacher.controller;

import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
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
import org.springframework.lang.Nullable;
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
    public TeacherController(TeacherService teacherService,
                             TeacherMapper teacherMapper) {
        this.teacherService = teacherService;
        this.teacherMapper = teacherMapper;
    }

    @PostMapping
    public ResponseEntity postTeacher(@RequestBody @Valid TeacherDto.Post request) {
        Teacher teacher = teacherMapper.postToTeacher(request);
        Teacher created = teacherService.createTeacher(teacher);
        URI location = UriCreator.createUri(TEACHER_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();

    }
    @PatchMapping("/subjects")
    public ResponseEntity patchSubject(@RequestBody @Valid TeacherDto.PatchSubject requestBody) {

        Teacher updated = teacherService.updateSubject(requestBody.getId(), requestBody.getSubjects());

        TeacherDto.PatchSubject response = teacherMapper.teacherToPatchSubject(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/regions")
    public ResponseEntity patchRegion(@RequestBody @Valid TeacherDto.PatchRegion requestBody) {

        Teacher updated = teacherService.updateRegion(requestBody.getId(), requestBody.getRegions());

        TeacherDto.PatchRegion response = teacherMapper.teacherToPatchRegion(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/password")
    public ResponseEntity patchPassword(@RequestBody @Valid TeacherDto.PatchPassword requestBody) {
        Teacher teacher = teacherMapper.patchPasswordToTeacher(requestBody);

        Teacher updated = teacherService.updatePassword(teacher);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("/name")
    public ResponseEntity patchName(@RequestBody @Valid TeacherDto.PatchName requestBody) {
        Teacher teacher = teacherMapper.patchNameToTeacher(requestBody);
        Teacher updated = teacherService.updateName(teacher);
        TeacherDto.PatchName response = teacherMapper.teacherToPatchName(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/phone")
    public ResponseEntity patchPhone(@RequestBody @Valid TeacherDto.PatchPhone requestBody) {
        Teacher teacher = teacherMapper.patchPhoneToTeacher(requestBody);
        Teacher updated = teacherService.updatePhone(teacher);
        TeacherDto.PatchPhone response = teacherMapper.teacherToPatchPhone(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/profileImg")
    public ResponseEntity patchProfileImg(@RequestBody @Valid TeacherDto.PatchProfileImg requestBody) {
        Teacher teacher = teacherMapper.patchProfileImgToTeacher(requestBody);
        Teacher updated = teacherService.updateProfileImg(teacher);
        TeacherDto.PatchProfileImg response = teacherMapper.teacherToPatchProfileImg(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/introduction")
    public ResponseEntity patchIntroduction(@RequestBody @Valid TeacherDto.PatchIntroduction requestBody) {
        Teacher teacher = teacherMapper.patchIntroductionToTeacher(requestBody);
        Teacher updated = teacherService.updateIntroduction(teacher);
        TeacherDto.PatchIntroduction response = teacherMapper.teacherToPatchIntroduction(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/career")
    public ResponseEntity patchCareer(@RequestBody @Valid TeacherDto.PatchCareer requestBody) {
        Teacher teacher = teacherMapper.patchCareerToTeacher(requestBody);
        Teacher updated = teacherService.updateCareer(teacher);
        TeacherDto.PatchCareer response = teacherMapper.teacherToPatchCareer(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/lectureFee")
    public ResponseEntity patchLectureFee(@RequestBody @Valid TeacherDto.PatchLectureFee requestBody) {
        Teacher teacher = teacherMapper.patchLectureFeeToTeacher(requestBody);
        Teacher updated = teacherService.updateLectureFee(teacher);
        TeacherDto.PatchLectureFee response = teacherMapper.teacherToPatchLectureFee(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/option")
    public ResponseEntity patchOption(@RequestBody @Valid TeacherDto.PatchOption requestBody) {
        Teacher teacher = teacherMapper.patchOptionToTeacher(requestBody);
        Teacher updated = teacherService.updateOption(teacher);
        TeacherDto.PatchOption response = teacherMapper.teacherToPatchOption(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/onLine")
    public ResponseEntity patchOnLine(@RequestBody @Valid TeacherDto.PatchOnLine requestBody) {
        Teacher teacher = teacherMapper.patchOnLineToTeacher(requestBody);
        Teacher updated = teacherService.updateOnLine(teacher);
        TeacherDto.PatchOnLine response = teacherMapper.teacherToPatchOnLine(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/offLine")
    public ResponseEntity patchOffLine(@RequestBody @Valid TeacherDto.PatchOffLine requestBody) {
        Teacher teacher = teacherMapper.patchOffLineToTeacher(requestBody);
        Teacher updated = teacherService.updateOffLine(teacher);
        TeacherDto.PatchOffLine response = teacherMapper.teacherToPatchOffLine(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PatchMapping("/address")
    public ResponseEntity patchAddress(@RequestBody @Valid TeacherDto.PatchAddress requestBody) {
        Teacher teacher = teacherMapper.patchAddressToTeacher(requestBody);
        Teacher updated = teacherService.updateAddress(teacher);
        TeacherDto.PatchAddress response = teacherMapper.teacherToPatchAddress(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/{teacher-id}/region")
    public ResponseEntity postTeacherRegion(@PathVariable("teacher-id") @Positive long teacherId,
                                             @RequestParam String regionName){
        teacherService.addRegionToTeacher(teacherId, regionName);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/{teacher-id}/region")
    public ResponseEntity deleteTeacherRegion(@PathVariable("teacher-id") @Positive long teacherId,
                                               @RequestParam String regionName){
        teacherService.deleteRegionFromTeacher(teacherId, regionName);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
        TeacherDto.Response response = teacherMapper.teacherToTeacherResponse(updated);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/{teacher-id}")
    public ResponseEntity getTeacher(@PathVariable("teacher-id") @Positive long teacherId){
        Teacher teacher = teacherService.findTeacher(teacherId);
        TeacherDto.Response response = teacherMapper.teacherToTeacherResponse(teacher);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getTeachers(@RequestParam String teacherName,
                                      @RequestParam(required = false) List<String> subjectNames,
                                      @RequestParam(required = false) List<String> regionNames,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        if(subjectNames != null)
            if(subjectNames.contains("전체"))
                subjectNames = null;
        if(regionNames != null)
            if(regionNames.contains("전체"))
                regionNames = null;

        Page<Teacher> pageTeachers = teacherService.searchTeachers(teacherName, subjectNames, regionNames,page-1, size);
        List<Teacher> teachers = pageTeachers.getContent();

        return new ResponseEntity<>(
                new TeacherListDto<>(teacherMapper.teachersToTeacherElements(teachers),
                        pageTeachers),HttpStatus.OK);

    }
    @DeleteMapping("/{teacher-id}")
    public ResponseEntity deleteTeacher(@PathVariable("teacher-id") @Positive long teacherId) {
        teacherService.deleteTeacher(teacherId); // 멤버 상태를 QUIT 으로...

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity verifyEmail(@PathVariable("email") String email) {
        teacherService.verifyEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
