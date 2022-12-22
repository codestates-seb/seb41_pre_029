package com.ikujo.stackoverflow.domain.member.entity;

import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
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
     * 해당 예시는 폼에서 profile 까지 받는다고 생각하고 작성했다.
     */
    public Member(String email, String password, String nickname, Profile profile) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static Member of(String email, String password, String nickname, Profile profile) {
        return new Member(
                email,
                password,
                nickname,
                profile
        );
    }

}
