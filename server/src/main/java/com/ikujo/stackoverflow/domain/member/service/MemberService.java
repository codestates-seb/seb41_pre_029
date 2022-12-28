package com.ikujo.stackoverflow.domain.member.service;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberDto;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberProfilePatch;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
import com.ikujo.stackoverflow.global.exception.BusinessLogicException;
import com.ikujo.stackoverflow.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    /**
     * 회원 가입
     */
    public MemberResponse createMember(MemberSignupPost memberSignupPost) {
        verifyExistsEmail(memberSignupPost.email());

        Member member = MemberDto.of(memberSignupPost).toEntity();

        // 암호화된 패스워드 저장
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        // 이메일 인증 로직 필요

        return MemberResponse.from(savedMember);
    }

    /**
     * 회원 프로필 수정 (리팩토링 필요!)
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Long id, MemberProfilePatch memberProfilePatch) {
        Member findMember = findVerifiedMember(id);

        // 닉네임은 필수
        Optional.of(memberProfilePatch.nickname())
                .ifPresent(findMember::setNickname);

        // 프로필 정보는 null 허용
        Optional.ofNullable(memberProfilePatch.image())
                .ifPresent(image -> findMember.getProfile().setImage(image));

        Optional.ofNullable(memberProfilePatch.location())
                .ifPresent(location -> findMember.getProfile().setLocation(location));

        Optional.ofNullable(memberProfilePatch.title())
                .ifPresent(title -> findMember.getProfile().setTitle(title));

        Optional.ofNullable(memberProfilePatch.aboutMe())
                .ifPresent(aboutMe -> findMember.getProfile().setAboutMe(aboutMe));

        Optional.ofNullable(memberProfilePatch.website())
                .ifPresent(website -> findMember.getLink().setWebsite(website));

        Optional.ofNullable(memberProfilePatch.twitter())
                .ifPresent(twitter -> findMember.getLink().setTwitter(twitter));

        Optional.ofNullable(memberProfilePatch.github())
                .ifPresent(github -> findMember.getLink().setGithub(github));

        return memberRepository.save(findMember);
    }

    /**
     * 회원 삭제
     */
    public void deleteMember(Long id) {
        Member findMember = findVerifiedMember(id);

        memberRepository.delete(findMember);
    }

    /**
     * 회원 조회
     */
    @Transactional(readOnly = true)
    public Member findMember(Long id) {
        return findVerifiedMember(id);
    }

    /**
     * 이메일 중복 검증
     */
    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    /**
     * 회원 조회 검증
     */
    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long id) {
        Member findMember = memberRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }
}
