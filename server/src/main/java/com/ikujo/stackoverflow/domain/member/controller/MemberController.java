package com.ikujo.stackoverflow.domain.member.controller;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.entity.dto.MemberResponseDto;
import com.ikujo.stackoverflow.domain.member.repository.StubMemberRepository;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    @GetMapping("/{id}")
    public ResponseEntity getMemberProfile(@PathVariable("id") Long id) {
        Member member = new Member(1L,
                "aaa@gmail.com",
                "1234",
                "김회원",
                new Profile("대한민국", "안녕하세요", "김회원입니다~"));

        MemberResponseDto memberResponseDto = MemberResponseDto.of(member);

        return new ResponseEntity<>(new SingleResponseDto<>(memberResponseDto), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchMemberProfile(@PathVariable("id") Long id) {

        return null;
    }


    @PostMapping("/signup")
    public ResponseEntity signup() {

        return null;
    }

    @PostMapping("/login")
    public ResponseEntity login() {

        return null;
    }

}