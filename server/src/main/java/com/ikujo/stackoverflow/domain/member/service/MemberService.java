package com.ikujo.stackoverflow.domain.member.service;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberDto;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberLoginPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberProfilePatch;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    /**
     * 회원 가입
     */
    public MemberResponse createMember(MemberSignupPost memberSignupPost) {
        verifyExistsEmail(memberSignupPost.email());

        Member member = MemberDto.of(memberSignupPost).toEntity();
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
        Optional.of(memberProfilePatch.image())
                .ifPresent(image -> findMember.getProfile().setImage(image));

        Optional.ofNullable(memberProfilePatch.location())
                .ifPresent(location -> findMember.getProfile().setLocation(location));

        Optional.ofNullable(memberProfilePatch.title())
                .ifPresent(title -> findMember.getProfile().setTitle(title));

        Optional.ofNullable(memberProfilePatch.aboutMe())
                .ifPresent(aboutMe -> findMember.getProfile().setAboutMe(aboutMe));

        return memberRepository.save(findMember);
    }

    /**
     * 회원 로그인 (리팩토링 필요!!)
     */
    public void loginMember(MemberLoginPost memberLoginPost) {
        Optional<Member> findMember = memberRepository.findByEmail(memberLoginPost.email());
        if (!findMember.isPresent()) {
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }

        // 비밀번호 검증 로직
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
            throw new RuntimeException("같은 이메일이 존재합니다.");
    }

    /**
     * 회원 조회 검증
     */
    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long id) {
        Member findMember = memberRepository.findById(id).orElseThrow(() ->
                new RuntimeException("잘못된 회원 정보입니다."));

        return findMember;
    }
}
