package com.windows33.cavendish.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@ToString
@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "users")
@Entity
public class Member implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String loginId;

    private String password;

    private String nickname;

    @Column(insertable = false)
    private String roles;

    @Column(insertable = false)
    private Byte state;

    @Override
    public String getUsername() {
        return loginId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // 회원 정보 수정
    public void updateMember(String nickname) {
        this.nickname = nickname;
    }

}
