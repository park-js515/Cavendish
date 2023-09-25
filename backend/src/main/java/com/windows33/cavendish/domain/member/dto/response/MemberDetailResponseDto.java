package com.windows33.cavendish.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberDetailResponseDto {

    private String loginId;
    private String nickname;

}
