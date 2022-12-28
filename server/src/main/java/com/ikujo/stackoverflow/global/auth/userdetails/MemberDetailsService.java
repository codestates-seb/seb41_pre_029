package com.ikujo.stackoverflow.global.auth.userdetails;

import com.ikujo.stackoverflow.domain.member.entity.Member;
import com.ikujo.stackoverflow.domain.member.repository.MemberRepository;
import com.ikujo.stackoverflow.global.auth.utils.CustomAuthorityUtils;
import com.ikujo.stackoverflow.global.exception.BusinessLogicException;
import com.ikujo.stackoverflow.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    /**
     * MemberDetails : UserDetails 구현체 (CustomUserDetails)
     */
    private final class MemberDetails extends Member implements UserDetails {

        /**
         * 로그인 생성자
         */
        MemberDetails(Member member) {
            setId(member.getId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        /**
         * 로그인한 유저의 권한 얻기
         */
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        /**
         * 계정 만료 여부
         */
        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        /**
         * 계정 잠김 여부
         */
        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        /**
         * 크리덴셜 만료 여부
         */
        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        /**
         * 사용자 활성화 여부
         */
        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}

