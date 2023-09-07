package com.codestates.connectInstructor.subject.mapper;

import com.codestates.connectInstructor.subject.dto.SubjectDto;
import com.codestates.connectInstructor.subject.entity.Subject;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    Subject subjectPostToSubject(SubjectDto.Post requestBody);
    SubjectDto.Response subjectToSubjectResponse(Subject subject);
    List<SubjectDto.Response> subjectsToSubjectResponses( List<Subject> subjects);

}
