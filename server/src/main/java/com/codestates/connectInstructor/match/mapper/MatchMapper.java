package com.codestates.connectInstructor.match.mapper;

import com.codestates.connectInstructor.match.dto.MatchDto;
import com.codestates.connectInstructor.match.entity.Match;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MatchMapper {
    default MatchDto.Response matchToResponse(Match match) {
        return MatchDto.Response.builder()
                .id(match.getId())
                .studentId(match.getStudent().getId())
                .teacherId(match.getTeacher().getId())
                .status(match.getStatus())
                .matchSubjects(
                        match.getMatchSubjects()
                                .stream().map(matchSubject ->
                                        matchSubject.getSubject().getSubjectName())
                                .collect(Collectors.toList())
                )
                .matchRegions(
                        match.getMatchRegions()
                                .stream().map(matchRegion ->
                                        matchRegion.getRegion().getRegionName())
                                .collect(Collectors.toList())
                )
                .date(match.getDate())
                .timeslot(match.getTimeslot())
                .isOnline(match.isOnline())
                .studentName(match.getStudentName())
                .studentPhone(match.getStudentPhone())
                .studentEmail(match.getStudentEmail())
                .remarks(match.getRemarks())
                .teacherName(match.getTeacher().getName())
                .build();
    }
}
