package com.windows33.cavendish.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberDetailResponseDto {

    private String memberId;
    private String nickname;

}
