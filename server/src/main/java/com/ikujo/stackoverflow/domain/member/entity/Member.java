package com.ikujo.stackoverflow.domain.member.entity;

import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@AllArgsConstructor // 테스트를 위한 용도
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 20)
    private String password;

    @Column(nullable = false, length = 20)
    private String nickname;

    @Embedded
    private Profile profile;

    /**
     * MemberSignupPostDto 사용을 위한 생성자 및 of 메서드
     */
    public Member(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    public static Member of(String email, String password, String nickname) {

        return new Member(email, password, nickname);
    }

    /**
     * MemberLoginPostDto 사용을 위한 생성자 및 of 메서드
     */
    public Member(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static Member of(String email, String password) {

        return new Member(email, password);
    }

    /**
     * MemberLoginPostDto 사용을 위한 생성자 및 of 메서드
     */
    public Member(String nickname, Profile profile) {
        this.nickname = nickname;
        this.profile = profile;
    }

    public static Member of(String nickname, Profile profile) {

        return new Member(nickname, profile);
    }

}
