package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.MemberSignupRequestDto;

public interface MemberService {



    void saveMember(MemberSignupRequestDto memberSignupRequestDto);

}
