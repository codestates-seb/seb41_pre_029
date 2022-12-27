package com.ikujo.stackoverflow.global.auth;

import lombok.Getter;

/**
 * 역직렬화를 위한 LoginDto 클래스
 */
@Getter
public class LoginDto {

    private String username;
    private String password;

}
