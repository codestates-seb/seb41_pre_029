package com.ikujo.stackoverflow.domain.member.repository;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.entity.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StubMemberRepository {


    public List<Member> members = new ArrayList<>(
            List.of(
                    new Member(1L,
                            "aaa@gmail.com",
                            "1234",
                            "김회원",
                            new Profile("이미지", "대한민국", "안녕하세요", "김회원입니다~")),

                    new Member(2L,
                            "bbb@gmail.com",
                            "1234",
                            "이회원",
                            new Profile("이미지", "서울", "주니어 개발자", "이회원입니다!")),

                    new Member(3L,
                            "ccc@gmail.com",
                            "1234",
                            "박회원",
                            new Profile("이미지", "부산", "시니어 개발자", "박회원이예요"))
            )
    );

    public Member findById(Long id) {

        for (Member m : members) {
            if (m.getId().equals(id)) {
                return m;
            }
        }

        return null;
    }

    public List<Member> findAll() {
        return members;
    }
}
