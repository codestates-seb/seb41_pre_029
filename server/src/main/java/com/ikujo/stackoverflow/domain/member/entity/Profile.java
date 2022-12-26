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

    private String image;

    private String location;

    @Column(length = 30)
    private String title;

    private String aboutMe;

}