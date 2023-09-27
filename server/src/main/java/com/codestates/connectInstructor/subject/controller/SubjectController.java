package com.codestates.connectInstructor.subject.controller;

import com.codestates.connectInstructor.subject.dto.SubjectDto;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.mapper.SubjectMapper;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/subjects")
@Validated
public class SubjectController {
    private final static String SUBJECT_DEFAULT_URL = "/subjects";
    private final SubjectService subjectService;
    private final SubjectMapper subjectMapper;
    public SubjectController(SubjectService subjectService, SubjectMapper subjectMapper) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
    }
    @PostMapping
    public ResponseEntity postSubject(@Valid @RequestBody SubjectDto.Post requestBody ){
        Subject subject = subjectMapper.subjectPostToSubject(requestBody);
        Subject created = subjectService.createSubject(subject);

        URI location = UriCreator.createUri(SUBJECT_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();
    }
    @GetMapping
    public ResponseEntity getSubjects(){
        List<Subject> subjects = subjectService.findSubjects();
        List<SubjectDto.Response> responses = subjectMapper.subjectsToSubjectResponses(subjects);

        return new ResponseEntity<>(new SubjectDto.ResponseList(responses) ,HttpStatus.OK);
    }
    @DeleteMapping("/{subject-id}")
    public ResponseEntity deleteSubject( @PathVariable("subject-id") @Positive long subjectId){

        subjectService.deleteSubject(subjectId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping
    public ResponseEntity deleteSubject( @RequestParam String subjectName){
        subjectService.deleteSubject(subjectName);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
