package com.ikujo.stackoverflow.domain.member.repository;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
