package com.codestates.connectInstructor.region.mapper;

import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.subject.dto.SubjectDto;
import com.codestates.connectInstructor.subject.entity.Subject;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegionMapper {
    Region regionPostToRegion(RegionDto.Post requestBody);
    RegionDto.Response regionToRegionResponse(Region region);
    List<RegionDto.Response> regionsToRegionResponses(List<Region> regions);
}
