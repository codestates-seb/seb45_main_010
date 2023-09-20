package com.codestates.connectInstructor.match.controller;

import com.codestates.connectInstructor.match.dto.MatchDto;
import com.codestates.connectInstructor.match.entity.Match;
import com.codestates.connectInstructor.match.mapper.MatchMapper;
import com.codestates.connectInstructor.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/matches")
@Validated
@RequiredArgsConstructor
public class MatchController {
    public final MatchService service;
    public final MatchMapper mapper;
    @GetMapping
    public ResponseEntity startMatch(@RequestParam long teacherId, @RequestParam long studentId) {
        MatchDto.GetResponse response = service.getBasicInformation(studentId, teacherId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postMatch(@RequestBody MatchDto.Post request) {
        Match match = service.postMatch(request);

        MatchDto.Response response = mapper.matchToResponse(match);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{match-id}")
    public ResponseEntity getMatch(@PathVariable("match-id") long matchId) {
        Match match = service.getMatch(matchId);

        MatchDto.Response response = mapper.matchToResponse(match);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity patchMatch(@RequestBody MatchDto.Patch request) {
        Match match = service.patchMatch(request.getId(), request.getStatus());

        MatchDto.Response response = mapper.matchToResponse(match);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
