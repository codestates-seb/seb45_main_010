package com.codestates.connectInstructor.region.controller;

import com.codestates.connectInstructor.region.dto.RegionDto;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.region.mapper.RegionMapper;
import com.codestates.connectInstructor.region.service.RegionService;
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
@RequestMapping("/regions")
@Validated
public class RegionController {
    private final static String REGION_DEFAULT_URL = "/regions";
    private final RegionService regionService;
    private final RegionMapper regionMapper;
    public RegionController(RegionService regionService, RegionMapper regionMapper) {
        this.regionService = regionService;
        this.regionMapper = regionMapper;
    }
    @PostMapping
    public ResponseEntity postRegion(@Valid @RequestBody RegionDto.Post requestBody){
        Region region = regionMapper.regionPostToRegion(requestBody);
        Region created = regionService.createRegion(region);

        URI location = UriCreator.createUri(REGION_DEFAULT_URL, created.getId());

        return ResponseEntity.created(location).build();
    }
    @GetMapping
    public ResponseEntity getRegions(){
        List<Region> regions = regionService.findRegions();
        List<RegionDto.Response> responses = regionMapper.regionsToRegionResponses(regions);

        return new ResponseEntity<>(new RegionDto.ResponseList(responses), HttpStatus.OK);
    }
    @DeleteMapping("/{region-id}")
    public ResponseEntity deleteRegion( @PathVariable("region-id") @Positive long regionId){

        regionService.deleteRegion(regionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping
    public ResponseEntity deleteRegion( @RequestParam String regionName){
        regionService.deleteRegion(regionName);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
