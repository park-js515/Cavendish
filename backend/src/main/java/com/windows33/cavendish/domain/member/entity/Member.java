package com.windows33.cavendish.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "users")
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String loginId;

    private String password;

    private String nickname;

    @Column(insertable = false)
    private String roles;

    @Column(insertable = false)
    private Byte state;

    public void updateMember(String nickname) {
        this.nickname = nickname;
    }

}
