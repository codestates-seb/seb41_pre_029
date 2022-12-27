package com.ikujo.stackoverflow.domain.member.entity;

import com.ikujo.stackoverflow.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
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

    @Setter
    @Embedded
    private Link link;

    /**
     * MemberDto 사용을 위한 생성자 및 of 메서드
     */
//    public Member(Long id, String email, String password, String nickname, Profile profile, Link link) {
//        this.id = id;
//        this.email = email;
//        this.password = password;
//        this.nickname = nickname;
//        this.profile = profile;
//        this.link = link;
//    }

    public static Member of(Long id, String email, String password, String nickname, Profile profile, Link link) {
        return new Member(id, email, password, nickname, profile, link);
    }

}
