package com.codestates.connectInstructor.teacher.service;

import com.codestates.connectInstructor.event.SignupEvent;
import com.codestates.connectInstructor.exception.BusinessLogicException;
import com.codestates.connectInstructor.exception.ExceptionCode;
import com.codestates.connectInstructor.region.entity.Region;
import com.codestates.connectInstructor.region.service.RegionService;
import com.codestates.connectInstructor.security.utils.CustomAuthorityUtils;
import com.codestates.connectInstructor.subject.entity.Subject;
import com.codestates.connectInstructor.subject.repository.SubjectRepository;
import com.codestates.connectInstructor.subject.service.SubjectService;
import com.codestates.connectInstructor.teacher.entity.Teacher;
import com.codestates.connectInstructor.teacher.entity.TeacherRegion;
import com.codestates.connectInstructor.teacher.entity.TeacherSubject;
import com.codestates.connectInstructor.teacher.repository.TeacherRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final SubjectService subjectService;
    private final RegionService regionService;

    public TeacherService(TeacherRepository teacherRepository,
                          ApplicationEventPublisher applicationEventPublisher,
                          PasswordEncoder passwordEncoder,
                          CustomAuthorityUtils customAuthorityUtils,
                          SubjectService subjectService,
                          RegionService regionService) {
        this.teacherRepository = teacherRepository;
        this.applicationEventPublisher = applicationEventPublisher;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
        this.subjectService = subjectService;
        this.regionService = regionService;
    }

    public Teacher createTeacher(Teacher teacher) {
        verifyEmail(teacher.getEmail());

        if (!teacher.isOauth()) {
            //TODO 패스워드 인코딩
            teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        }
        teacher.setRoles(customAuthorityUtils.getTEACHER_ROLES_STRING());

        Teacher saved = teacherRepository.save(teacher);

        applicationEventPublisher.publishEvent(new SignupEvent(saved.getEmail(), saved.getName()));

        return saved;
    }
    public Teacher updatePassword(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setPassword(passwordEncoder.encode(teacher.getPassword()));

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateName(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setName(teacher.getName());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updatePhone(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setPhone(teacher.getPhone());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateProfileImg(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setProfileImg(teacher.getProfileImg());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateIntroduction(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setIntroduction(teacher.getIntroduction());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateCareer(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setCareer(teacher.getCareer());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateLectureFee(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setLectureFee(teacher.getLectureFee());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateOption(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setOption(teacher.getOption());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateOnLine(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setOnLine(teacher.isOnLine());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateOffLine(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setOffLine(teacher.isOffLine());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateAddress(Teacher teacher){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());
        findTeacher.setAddress(teacher.getAddress());

        return teacherRepository.save(findTeacher);
    }
    public Teacher updateTeacher( Teacher teacher ){
        verifyIdentity(teacher.getId());

        Teacher findTeacher = findVerifiedTeacher(teacher.getId());

        Optional.ofNullable(teacher.getName())
                .ifPresent(name -> findTeacher.setName(name));
        Optional.ofNullable(teacher.getPhone())
                .ifPresent(phone -> findTeacher.setPhone(phone));
        Optional.ofNullable(teacher.getProfileImg())
                .ifPresent(profileImg -> findTeacher.setProfileImg(profileImg));
        Optional.ofNullable(teacher.getIntroduction())
                .ifPresent(introduction -> findTeacher.setIntroduction(introduction));
        Optional.ofNullable(teacher.getCareer())
                .ifPresent(career -> findTeacher.setCareer(career));
        Optional.ofNullable(teacher.getLectureFee())
                .ifPresent(lectureFee -> findTeacher.setLectureFee(lectureFee));
        Optional.ofNullable(teacher.getOption())
                .ifPresent(option -> findTeacher.setOption(option));
        Optional.ofNullable(teacher.getAddress())
                .ifPresent(address -> findTeacher.setAddress(address));

        if( teacher.isOnLine() != findTeacher.isOnLine())
            findTeacher.setOnLine(teacher.isOnLine());
        if( teacher.isOffLine() != findTeacher.isOffLine())
            findTeacher.setOffLine(teacher.isOffLine());

        findTeacher.setLastModified(LocalDateTime.now());

        return teacherRepository.save(findTeacher);
    }
    public void addRegionToTeacher( long teacherId, String regionName ){
        verifyIdentity(teacherId);

        Teacher teacher = findVerifiedTeacher(teacherId);
        Region region = regionService.findVerifiedRegion(regionName);

        List<TeacherRegion> teacherRegions = teacher.getTeacherRegions();

        for( TeacherRegion teacherRegion : teacherRegions ){
            if( teacherRegion.getTeacher().getId() == teacherId )
                if( teacherRegion.getRegion().getRegionName().equals(regionName))
                    throw new BusinessLogicException( ExceptionCode.TEACHER_REGION_EXISTS );
        }

        TeacherRegion teacherRegion = new TeacherRegion();
        teacherRegion.setTeacher(teacher);
        teacherRegion.setRegion(region);

        teacher.addTeacherRegion(teacherRegion);

        teacherRepository.save(teacher);
    }
    public void deleteRegionFromTeacher( long teacherId, String regionName ){
        verifyIdentity(teacherId);

        Teacher teacher = findVerifiedTeacher(teacherId);
        Region region = regionService.findVerifiedRegion(regionName);
/*
        List<TeacherRegion> teacherRegions = teacher.getTeacherRegions();
        TeacherRegion remove = null;
        for( TeacherRegion teacherRegion : teacherRegions ){
            if( teacherRegion.getTeacher().getId() == teacherId )
                if( teacherRegion.getRegion().getRegionName().equals(regionName))
                    teacher.removeTeacherRegion(teacherRegion);
        }
*/
        List<TeacherRegion> teacherRegions = teacher.getTeacherRegions();
        Iterator<TeacherRegion> iterator = teacherRegions.iterator();

        while (iterator.hasNext()) {
            TeacherRegion teacherRegion = iterator.next();
            if (teacherRegion.getTeacher().getId() == teacherId && teacherRegion.getRegion().getRegionName().equals(regionName)) {
                iterator.remove(); // 이렇게 해서 리스트에서 제거합니다.
            }
        }

        teacherRepository.save(teacher);
    }
    public void addSubjectToTeacher( long teacherId, String subjectName ){
        verifyIdentity(teacherId);

        Teacher teacher = findVerifiedTeacher(teacherId);
        Subject subject = subjectService.findVerifiedSubject(subjectName);

        List<TeacherSubject> teacherSubjects = teacher.getTeacherSubjects();

        for( TeacherSubject teacherSubject : teacherSubjects ){
            if( teacherSubject.getTeacher().getId() == teacherId )
                if( teacherSubject.getSubject().getSubjectName().equals(subjectName))
                    throw new BusinessLogicException( ExceptionCode.TEACHER_SUBJECT_EXISTS );
        }

        TeacherSubject teacherSubject = new TeacherSubject();
        teacherSubject.setTeacher(teacher);
        teacherSubject.setSubject(subject);

        teacher.addTeacherSubject(teacherSubject);

        teacherRepository.save(teacher);
    }
    public void deleteSubjectFromTeacher( long teacherId, String subjectName ){
        verifyIdentity(teacherId);

        Teacher teacher = findVerifiedTeacher(teacherId);
        Subject subject = subjectService.findVerifiedSubject(subjectName);
        System.out.println(teacher.getTeacherSubjects().size());

        List<TeacherSubject> teacherSubjects = teacher.getTeacherSubjects();

        for( int i = 0; i < teacherSubjects.size(); i++ ){
            TeacherSubject teacherSubject = teacherSubjects.get(i);
            if( teacherSubject.getSubject().getSubjectName().equals(subjectName))
                teacher.getTeacherSubjects().remove(teacherSubject);
        }
        System.out.println(teacher.getTeacherSubjects().size());

        teacherRepository.save(teacher);
    }
    public Teacher findTeacher( long teacherId){
        return findVerifiedTeacher(teacherId);
    }
    public Page<Teacher> searchTeachers(String teacherName, List<String> subjectNames,
                                        List<String> regionNames, int page, int size){

        return teacherRepository.findTeachersBySubjectAndRegionAndTeacherName(teacherName, subjectNames, regionNames,
                PageRequest.of(page,size, Sort.by("createdAt").descending()) );
    }
    @Transactional(readOnly = true)
    public Teacher findVerifiedTeacher(long teacherId){
        Optional<Teacher> teacher = teacherRepository.findById(teacherId);
        Teacher findTeacher =
                teacher.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findTeacher;
    }
    public void verifyEmail(String email) {
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);

        if (optionalTeacher.isPresent()) throw new BusinessLogicException(ExceptionCode.USED_EMAIL);
    }
    private void verifyIdentity(long teacherId){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Teacher teacher = findVerifiedTeacher(teacherId);

        if(!authentication.getName().equals(teacher.getEmail()))
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);
    }
}
