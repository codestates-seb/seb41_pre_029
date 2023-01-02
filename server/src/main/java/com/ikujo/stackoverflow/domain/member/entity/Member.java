package com.ikujo.stackoverflow.domain.member.entity;

import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor // 테스트를 위한 용도
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    // 로그인 인증을 위한 패스워드
    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 20)
    private String nickname;

    @Embedded
    private Profile profile;

    @Embedded
    private Link link;

    // 권한 부여를 위한 권한 테이블
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    /**
     * MemberDto 사용을 위한 생성자 및 of 메서드
     */
    public Member(Long id, String email, String password, String nickname, Profile profile, Link link) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.link = link;
    }

    public static Member of(Long id, String email, String password, String nickname, Profile profile, Link link) {
        return new Member(id, email, password, nickname, profile, link);
    }

    public Member(Long id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }

    public enum MemberRole {
        ROLE_USER
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                '}';
    }
}
