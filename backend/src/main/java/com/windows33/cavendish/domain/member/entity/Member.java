package com.windows33.cavendish.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@ToString
@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "users")
@Entity
public class Member {

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

    // 회원 정보 수정
    public void updateMember(String nickname) {
        this.nickname = nickname;
    }

}
