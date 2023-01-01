//package com.ikujo.stackoverflow.global.auth.oauth2;
//
//import com.ikujo.stackoverflow.domain.member.entity.Member;
//import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
//import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class OAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//
//    private final MemberRepository memberRepository;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//
//    }
//
//    public static final class OAuth2Member extends Member implements OAuth2User {
//
//        private String attributeKey;
//        private String name;
//
//        OAuth2Member(Map<String, Object> attributes, String name, String attributeKey, Member member) {
//            this.attributeKey = attributeKey;
//            this.name = name;
//            setEmail(member.getEmail());
//            setPassword(member.getPassword());
//            setRoles(member.getRoles());
//
//        }
//
//        @Override
//        public Map<String, Object> getAttributes() {
//            Map<String, Object> map = new HashMap<>();
//            map.put("id", attributeKey);
//            map.put("key", attributeKey);
//            map.put("name", name);
//            map.put("email", super.getEmail());
//            map.put("roles", super.getRoles());
//        }
//
//        @Override
//        public Collection<? extends GrantedAuthority> getAuthorities() {
//            return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
//        }
//
//        @Override
//        public String getName() {
//            return null;
//        }
//    }
//}
