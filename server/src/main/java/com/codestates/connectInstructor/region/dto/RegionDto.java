package com.codestates.connectInstructor.region.dto;

import com.codestates.connectInstructor.subject.dto.SubjectDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class RegionDto {
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Post {
        @NotBlank
        private String regionName;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class Response {
        private long id;
        private String regionName;
    }
    @Getter@Setter@NoArgsConstructor@AllArgsConstructor
    public static class ResponseList {
        private List<RegionDto.Response> regions;
    }
}
