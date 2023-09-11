package com.codestates.connectInstructor.student.mapper;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.student.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ObjectFactory;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student postToStudent(StudentDto.Post request);

    Student patchIntroductionToStudent(StudentDto.PatchIntroduction request);

    StudentDto.PatchIntroduction studentToPatchIntroduction(Student updated);

    StudentDto.PatchIntroduction studentToPatchLessonOption(Student updated);

    Student patchPatchLessonOptionToStudent(StudentDto.PatchLessonOption request);

    Student patchNameToStudent(StudentDto.PatchName request);

    Student patchPasswordToStudent(StudentDto.PatchPassword request);

    Student patchPhoneNumberToStudent(StudentDto.PatchPhoneNumber request);

    StudentDto.PatchName studentToPatchName(Student updated);

    StudentDto.PatchPhoneNumber studentToPatchPhoneNumber(Student updated);

    StudentDto.SimpleResponse studentToSimpleResponse(Student student);

    default StudentDto.PatchSubject studentToPatchSubject(Student updated) {
        return StudentDto.PatchSubject.builder()
                .studentId(updated.getId())
                .subjects(
                        updated
                                .getStudentSubjects()
                                .stream().map(x -> x.getSubject().getSubjectName())
                                .collect(Collectors.toList())
                )
                .build();
    }
}
