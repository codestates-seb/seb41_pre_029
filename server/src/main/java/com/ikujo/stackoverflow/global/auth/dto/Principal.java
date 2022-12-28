package com.ikujo.stackoverflow.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 정보를 Security에 담기 위한 Principal
 */
@Getter
@Setter
@AllArgsConstructor
public class Principal {

    private String email;
    private Long id;

}
