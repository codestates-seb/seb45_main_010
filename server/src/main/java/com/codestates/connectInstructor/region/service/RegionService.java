package com.codestates.connectInstructor.region.service;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.region.repository.RegionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RegionService {
    private final RegionRepository regionRepository;

    public RegionService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }
    public Region createRegion( Region region ){
        verifyExistsRegionName(region.getRegionName());

        return regionRepository.save(region);
    }
    public List<Region> findRegions(){
        return regionRepository.findAll();
    }
    public List<Region> findRegionsWithTeacherId( long teacherId ){
        return regionRepository.findByTeacherId(teacherId);
    }
    public void deleteRegion( long regionId ){
        Region region = findVerifiedRegion(regionId);

        regionRepository.delete(region);
    }
    public void deleteRegion( String regionName ){
        Region region = findVerifiedRegion(regionName);

        regionRepository.delete(region);
    }
    public Region findVerifiedRegion( long regionId ){
        Optional<Region> region = regionRepository.findById(regionId);
        Region findRegion =
                region.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REGION_NOT_FOUND));

        return findRegion;
    }
    public Region findVerifiedRegion( String regionName ){
        Optional<Region> region = regionRepository.findByRegionName(regionName);
        Region findRegion =
                region.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REGION_NOT_FOUND));

        return findRegion;
    }
    private void verifyExistsRegionName( String regionName ){
        Optional<Region> region = regionRepository.findByRegionName(regionName);
        if(region.isPresent())
            throw new BusinessLogicException(ExceptionCode.REGION_EXISTS);
    }
}
