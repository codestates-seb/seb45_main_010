package com.codestates.connectInstructor.student.mapper;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ObjectFactory;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student postToStudent(StudentDto.Post request);

    Student patchIntroductionToStudent(StudentDto.PatchIntroduction request);

    StudentDto.PatchIntroduction studentToPatchIntroduction(Student updated);

    StudentDto.PatchIntroduction studentToPatchLessonOption(Student updated);

    Student patchPatchLessonOptionToStudent(StudentDto.PatchLessonOption request);

    Student patchNameToStudent(StudentDto.PatchName request);

    Student patchPasswordToStudent(StudentDto.PatchPassword request);

    Student patchPhoneNumberToStudent(StudentDto.PatchPassword request);

    StudentDto.PatchName studentToPatchName(Student updated);

    StudentDto.PatchPassword studentToPatchPassword(Student updated);


    StudentDto.ResponsePatchSubject studentToResponsePatchSubject(Student updated);
}
