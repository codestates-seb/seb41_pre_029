package com.ikujo.stackoverflow.domain.member.service;

import com.ikujo.stackoverflow.domain.member.repository.StubMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final StubMemberRepository stubMemberRepository;


}
