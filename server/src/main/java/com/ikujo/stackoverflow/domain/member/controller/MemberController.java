package com.ikujo.stackoverflow.domain.member.controller;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberProfilePatch;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
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

        MemberResponse memberResponseDto = MemberResponse.of(member);

        return new ResponseEntity<>(new SingleResponseDto<>(memberResponseDto), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchMemberProfile(@PathVariable("id") Long id,
                                             @Valid @RequestBody MemberProfilePatch profilePatchDto) {

        Member member = new Member(1L,
                "aaa@gmail.com",
                "1234",
                "김회원",
                new Profile("대한민국", "안녕하세요", "김회원입니다~"));

        MemberResponse memberResponse = MemberResponse.of(member);

        return new ResponseEntity<>(new SingleResponseDto<>(memberResponse), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMember(@PathVariable("id") Long id) {

        return ResponseEntity.noContent().build();
    }


    @PostMapping("/signup")
    public ResponseEntity signup() {

        return ResponseEntity.created(null).build();
    }

    @PostMapping("/login")
    public ResponseEntity login() {

        return ResponseEntity.ok(null);
    }

}
