package com.codestates.connectInstructor.subject.service;

import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.repository.SubjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubjectService {
    private final SubjectRepository subjectRepository;
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    public Subject createSubject(Subject subject){
        verifyExistsSubjectName(subject.getSubjectName());

        return subjectRepository.save(subject);
    }
    public List<Subject> findSubjects(){
        return subjectRepository.findAll();
    }
    public void deleteSubject( long subjectId ){
        Subject subject = findVerifiedSubject(subjectId);

        subjectRepository.delete(subject);
    }
    public void deleteSubject(String subjectName){
        Subject subject = findVerifiedSubject(subjectName);

        subjectRepository.delete(subject);
    }
    private void verifyExistsSubjectName(String subjectName ){
        Optional<Subject> subject = subjectRepository.findBySubjectName(subjectName);
        if(subject.isPresent())
            throw new BusinessLogicException(ExceptionCode.SUBJECT_EXISTS);
    }
    private Subject findVerifiedSubject( String subjectName ){
        Optional<Subject> subject = subjectRepository.findBySubjectName(subjectName);
        Subject findSubject =
                subject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SUBJECT_NOT_FOUND));
        return findSubject;
    }
    private Subject findVerifiedSubject( long subjectId ){
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        Subject findSubject =
                subject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SUBJECT_NOT_FOUND));
        return findSubject;
    }
}
