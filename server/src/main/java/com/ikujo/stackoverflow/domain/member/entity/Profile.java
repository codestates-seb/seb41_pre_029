package com.ikujo.stackoverflow.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Profile {

    private String location;

    @Column(length = 30)
    private String title;

    private String aboutMe;

    public static Profile of(String location, String title, String aboutMe) {
        return new Profile(location, title, aboutMe);
    }
}