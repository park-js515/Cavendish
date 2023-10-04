package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.request.MemberLoginIdCheckRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberNicknameCheckRequestDto;
import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;

public interface MemberService {

    String login(String memberId, String password);

    void signup(MemberSignupRequestDto memberSignupRequestDto);

    void removeMember(Integer id);

    MemberDetailResponseDto findMember(Integer id);

    Boolean modifyMember(MemberModifyRequestDto memberModifyRequestDto, Integer id);

    Boolean checkLoginId(String loginId);

    Boolean checkNickname(String nickname);

}
