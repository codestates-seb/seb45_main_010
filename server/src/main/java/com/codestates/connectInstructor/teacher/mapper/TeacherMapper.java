package com.codestates.connectInstructor.teacher.mapper;

import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.student.dto.StudentDto;
import com.codestates.connectInstructor.subject.mapper.SubjectMapper;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.dto.TeacherDto;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    Teacher postToTeacher(TeacherDto.Post request);
    Teacher patchToTeacher(TeacherDto.Patch requestBody);
    default TeacherDto.Response teacherToTeacherResponse(Teacher teacher,
                                                         SubjectService subjectService,
                                                         RegionService regionService,
                                                         SubjectMapper subjectMapper,
                                                         RegionMapper regionMapper){
        if (teacher == null) {
            return null;
        } else {
            TeacherDto.Response response = new TeacherDto.Response();
            response.setId(teacher.getId());
            response.setEmail(teacher.getEmail());
            response.setName(teacher.getName());
            response.setPhone(teacher.getPhone());
            response.setProfileImg(teacher.getProfileImg());
            response.setIntroduction(teacher.getIntroduction());
            response.setCareer(teacher.getCareer());
            response.setLectureFee(teacher.getLectureFee());
            response.setOption(teacher.getOption());
            response.setOnLine(teacher.isOnLine());
            response.setOffLine(teacher.isOffLine());
            response.setAddress(teacher.getAddress());
            response.setOauth(teacher.isOauth());
            response.setSubjects(subjectMapper.subjectsToSubjectResponses(subjectService.findSubjectsWithTeacherId(teacher.getId())));
            response.setRegions(regionMapper.regionsToRegionResponses(regionService.findRegionsWithTeacherId(teacher.getId())));
            response.setLastLogin(teacher.getLastLogin());
            response.setLastModified(teacher.getLastModified());
            response.setCreatedAt(teacher.getCreatedAt());
            return response;
        }
    }
    default TeacherDto.Element teacherToTeacherElement(Teacher teacher,
                                                       SubjectService subjectService,
                                                       RegionService regionService,
                                                       SubjectMapper subjectMapper,
                                                       RegionMapper regionMapper){
        if (teacher == null) {
            return null;
        } else {
            TeacherDto.Element element = new TeacherDto.Element();
            element.setId(teacher.getId());
            element.setOnLine(teacher.isOnLine());
            element.setOffLine(teacher.isOffLine());
            element.setName(teacher.getName());
            element.setProfileImg(teacher.getProfileImg());
            element.setSubjects(subjectMapper.subjectsToSubjectResponses(subjectService.findSubjectsWithTeacherId(teacher.getId())));
            element.setRegions(regionMapper.regionsToRegionResponses(regionService.findRegionsWithTeacherId(teacher.getId())));
            element.setCreatedAt(teacher.getCreatedAt());
            return element;
        }
    }
    default List<TeacherDto.Element> teachersToTeacherElements(List<Teacher> teachers,
                                                       SubjectService subjectService,
                                                       RegionService regionService,
                                                       SubjectMapper subjectMapper,
                                                       RegionMapper regionMapper){
        if (teachers == null) {
            return null;
        } else {
            List<TeacherDto.Element> list = new ArrayList(teachers.size());
            Iterator var3 = teachers.iterator();

            while(var3.hasNext()) {
                Teacher teacher = (Teacher)var3.next();
                list.add(this.teacherToTeacherElement(teacher,
                        subjectService, regionService, subjectMapper, regionMapper));
            }

            return list;
        }
    }
}
