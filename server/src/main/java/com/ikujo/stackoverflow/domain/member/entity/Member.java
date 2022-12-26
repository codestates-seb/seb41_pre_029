package com.ikujo.stackoverflow.domain.member.entity;

import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

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

    @Setter
    @Column(nullable = false, length = 20)
    private String nickname;

    @Setter
    @Embedded
    private Profile profile;

    /**
     * MemberDto 사용을 위한 생성자 및 of 메서드
     */
    public Member(String email, String password, String nickname, Profile profile) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static Member of(String email, String password, String nickname, Profile profile) {
        return new Member(email, password, nickname, profile);
    }

    public Member(Long id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }

}
