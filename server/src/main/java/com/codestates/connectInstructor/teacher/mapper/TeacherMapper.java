package com.codestates.connectInstructor.teacher.mapper;

import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    Teacher postToTeacher(StudentDto.Post request);
}
