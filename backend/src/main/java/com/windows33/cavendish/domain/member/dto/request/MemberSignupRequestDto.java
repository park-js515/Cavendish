package com.windows33.cavendish.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberSignupRequestDto {

    private String loginId;
    private String password;
    private String nickname;

}
