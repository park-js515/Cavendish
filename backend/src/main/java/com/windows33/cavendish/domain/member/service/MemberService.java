package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.dto.TokenInfo;

public interface MemberService {

    TokenInfo login(String memberId, String password);

    void signup(MemberSignupRequestDto memberSignupRequestDto);

    void removeMember();

}
