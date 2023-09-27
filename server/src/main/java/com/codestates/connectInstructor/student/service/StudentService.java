package com.codestates.connectInstructor.student.service;

import com.codestates.connectInstructor.common.MemberStatus;
import com.codestates.connectInstructor.email.event.SignupEvent;
import com.codestates.connectInstructor.email.event.VerifyEmailEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.region.repository.RegionRepository;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.student.entity.Student;
import com.codestates.connectInstructor.student.entity.StudentRegion;
import com.codestates.connectInstructor.student.entity.StudentSubject;
import com.codestates.connectInstructor.student.repository.StudentRepository;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.repository.SubjectRepository;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class StudentService {
    private final StudentRepository repository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final RegionRepository regionRepository;


    public Student createStudent(Student student) {
        verifyEmail(student.getEmail());

        if (!student.isOauth()) {
            student.setPassword(passwordEncoder.encode(student.getPassword()));
        }

        student.setRoles(customAuthorityUtils.getSTUDENT_ROLES_STRING());

        Student saved = repository.save(student);

        applicationEventPublisher.publishEvent(new VerifyEmailEvent(saved.getEmail(), saved.getName()));

        return saved;
    }

    public void verifyEmail(String email) {
        Optional<Student> optionalStudent = repository.findByEmail(email);

        if (optionalStudent.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }

    public void verifyTeacherEmail(String email) {
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalTeacher.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }

    public boolean checkUsedEmail(String email) {
        try {
            verifyEmail(email);
            verifyTeacherEmail(email);
        } catch (BusinessLogicException be) {
            return true;
        }

        return false;
    }

    public Student updateIntroduction(Student student) {
        if (!verifyIdentity(student.getId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(student.getId());

        found.setIntroduction(student.getIntroduction());

        return repository.save(found);
    }

    public Student findStudentById(long id) {
        Optional<Student> optionalStudent = repository.findById(id);

        Student verified = optionalStudent.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return verified;
    }

    public Student updateLessonOption(Student student) {
        if (!verifyIdentity(student.getId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(student.getId());

        found.setOption(student.getOption());

        return repository.save(found);
    }

    public void deleteStudent(long studentId) {
        if (!verifyIdentity(studentId)) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(studentId);

        found.setStatus(MemberStatus.QUIT);

        repository.save(found);
    }

    public Student updateName(Student student) {
        if (!verifyIdentity(student.getId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(student.getId());

        found.setName(student.getName());

        return repository.save(found);
    }

    public boolean verifyIdentity(long id) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Student found = findStudentById(id);

        return authentication.getName().toString().equals(found.getEmail()) ? true : false;
    }


    public Student updatePassword(Student student) {
        if (!verifyIdentity(student.getId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(student.getId());

        found.setPassword(passwordEncoder.encode(student.getPassword()));

        return repository.save(found);
    }

    public Student updatePhoneNumber(Student student) {
        if (!verifyIdentity(student.getId())) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(student.getId());

        found.setPhone(student.getPhone());

        return repository.save(found);
    }

    public Student updateSubject(long studentId, List<String> subjects) {
        if (!verifyIdentity(studentId)) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(studentId);
        List<StudentSubject> studentSubjectsFound = found.getStudentSubjects();

        long studentSubjectsFoundSize = studentSubjectsFound.size();

        for (int i = 0; i < studentSubjectsFoundSize; i++) {
            StudentSubject studentSubject = studentSubjectsFound.get(i);

            if (!subjects.contains(studentSubject.getSubject().getSubjectName())) {
                found.getStudentSubjects().remove(studentSubject);
            }
        }

        for (String subjectsName : subjects) {
            boolean subjectExist = false;
            for (StudentSubject studentSubject : studentSubjectsFound) {
                if (studentSubject.getSubject().getSubjectName().equals(subjectsName)) {
                    subjectExist = true;
                    break;
                }
            }

            if (!subjectExist) {
                Subject subject = subjectRepository.findBySubjectName(subjectsName).orElseThrow(() -> new BusinessLogicException(ExceptionCode.SUBJECT_NOT_FOUND));

                StudentSubject studentSubject = new StudentSubject();
                studentSubject.setStudent(found);
                studentSubject.setSubject(subject);

                found.getStudentSubjects().add(studentSubject);
            }
        }

        return repository.save(found);
    }

    public Student updateRegion(long studentId, List<String> regions) {
        if (!verifyIdentity(studentId)) throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);

        Student found = findStudentById(studentId);
        List<StudentRegion> studentRegionsFound = found.getStudentRegions();

        long studentRegionsFoundSize = studentRegionsFound.size();

        for (int i = 0; i < studentRegionsFoundSize; i++) {
            StudentRegion studentRegion = studentRegionsFound.get(i);

            if (!regions.contains(studentRegion.getRegion().getRegionName())) {
                found.getStudentRegions().remove(studentRegion);
            }
        }

        for (String regionsName : regions) {
            boolean regionExist = false;
            for (StudentRegion studentRegion : studentRegionsFound) {
                if (studentRegion.getRegion().getRegionName().equals(regionsName)) {
                    regionExist = true;
                    break;
                }
            }

            if (!regionExist) {
                Region region = regionRepository.findByRegionName(regionsName).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REGION_NOT_FOUND));

                StudentRegion studentRegion = new StudentRegion();
                studentRegion.setStudent(found);
                studentRegion.setRegion(region);

                found.getStudentRegions().add(studentRegion);
            }
        }

        return repository.save(found);
    }
}
