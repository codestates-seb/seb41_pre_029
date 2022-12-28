package com.ikujo.stackoverflow.domain.member.controller;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberProfilePatch;
import com.ikujo.stackoverflow.domain.member.entity.dto.request.MemberSignupPost;
import com.ikujo.stackoverflow.domain.member.entity.dto.response.MemberResponse;
import com.ikujo.stackoverflow.domain.member.service.MemberService;
import com.ikujo.stackoverflow.global.dto.SingleResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 테스트 후 주석 달기
     */

    @GetMapping("/{id}")
    public ResponseEntity getMemberProfile(@PathVariable("id") Long id) {
        Member findMember = memberService.findMember(id);
        MemberResponse response = MemberResponse.from(findMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchMemberProfile(@PathVariable("id") Long id,
                                             @Valid @RequestBody MemberProfilePatch profilePatchDto) {

        Member updateMember = memberService.updateMember(id, profilePatchDto);

        MemberResponse response = MemberResponse.from(updateMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMember(@PathVariable("id") Long id) {
        memberService.deleteMember(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberSignupPost memberSignupPost) {
        MemberResponse response = memberService.createMember(memberSignupPost);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

}
