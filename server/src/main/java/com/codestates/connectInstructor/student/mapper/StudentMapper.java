package com.codestates.connectInstructor.student.mapper;

import com.codestates.connectInstructor.common.MemberStatus;
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

    StudentDto.PatchLessonOption studentToPatchLessonOption(Student updated);

    Student patchPatchLessonOptionToStudent(StudentDto.PatchLessonOption request);

    Student patchNameToStudent(StudentDto.PatchName request);

    Student patchPasswordToStudent(StudentDto.PatchPassword request);

    Student patchPhoneNumberToStudent(StudentDto.PatchPhoneNumber request);

    StudentDto.PatchName studentToPatchName(Student updated);

    StudentDto.PatchPhoneNumber studentToPatchPhoneNumber(Student updated);

    StudentDto.SimpleResponse studentToSimpleResponse(Student student);

    default StudentDto.PatchSubject studentToPatchSubject(Student updated) {
        return StudentDto.PatchSubject.builder()
                .id(updated.getId())
                .subjects(
                        updated
                                .getStudentSubjects()
                                .stream().map(x -> x.getSubject().getSubjectName())
                                .collect(Collectors.toList())
                )
                .build();
    }

    default StudentDto.PatchRegion studentToPatchRegion(Student student) {
        return StudentDto.PatchRegion.builder()
                .id(student.getId())
                .regions(
                        student.getStudentRegions()
                                .stream().map(x -> x.getRegion().getRegionName())
                                .collect(Collectors.toList())
                ).build();
    }

    default StudentDto.DetailResponse studentToDetailResponse(Student student) {

        return StudentDto.DetailResponse.builder()
                .id(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .profileImg(student.getProfileImg())
                .introduction(student.getIntroduction())
                .option(student.getOption())
                .phone(student.getPhone())
                .isOauth(student.isOauth())
                .status(student.getStatus())
                .subjects(student.getStudentSubjects()
                        .stream()
                        .map(x -> x.getSubject().getSubjectName())
                        .collect(Collectors.toList()))
                .regions(student.getStudentRegions()
                        .stream()
                        .map(x -> x.getRegion().getRegionName())
                        .collect(Collectors.toList()))
                .matches(student.getMatches()
                        .stream()
                        .map(x ->
                                StudentDto.MatchResponse.builder()
                                        .matchId(x.getId())
                                        .teacherName(x.getTeacher().getName())
                                        .date(x.getDate())
                                        .timeslot(x.getTimeslot())
                                        .subjects(x.getMatchSubjects()
                                                .stream()
                                                .map(y -> y.getSubject().getSubjectName())
                                                .collect(Collectors.toList()))
                                        .status(x.getStatus())
                                        .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
