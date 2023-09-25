package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.dto.TokenInfo;

public interface MemberService {

    TokenInfo login(String memberId, String password);

    void signup(MemberSignupRequestDto memberSignupRequestDto);

    void removeMember(int id);

    MemberDetailResponseDto findMember(int id);

    Boolean modifyMember(MemberModifyRequestDto memberModifyRequestDto, int id);

}
