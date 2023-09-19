package com.windows33.cavendish.domain.member.dto;

import lombok.Data;

@Data
public class MemberLoginRequestDto {

    private String memberId;
    private String password;

}
