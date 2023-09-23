package com.windows33.cavendish.domain.member.controller;

import com.windows33.cavendish.domain.member.dto.*;
import com.windows33.cavendish.domain.member.dto.request.MemberLoginRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.service.MemberServiceImpl;
import com.windows33.cavendish.global.jwt.UserPrincipal;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.windows33.cavendish.global.response.CommonResponse.*;

@Tag(name = "Member", description = "회원 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberServiceImpl memberService;
    private final UserPrincipal userPrincipal = new UserPrincipal();

    @Operation(summary = "로그인", description = "로그인")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "회원 정보")
    })
    @PostMapping("/login")
    public CommonResponse<TokenInfo> login(
            @RequestBody MemberLoginRequestDto memberLoginRequestDto
    ) {
        String memberId = memberLoginRequestDto.getLoginId();
        String password = memberLoginRequestDto.getPassword();

        TokenInfo tokenInfo = memberService.login(memberId, password);

        return CommonResponse.OK(tokenInfo);
    }

    @Operation(summary = "회원가입", description = "회원가입")
    @Parameters({
            @Parameter(name = "memberSignupRequestDto", description = "회원 정보")
    })
    @PostMapping("/signup")
    public CommonResponse<Void> signup(
            @RequestBody MemberSignupRequestDto memberSignupRequestDto
    ) {
        memberService.signup(memberSignupRequestDto);

        return OK(null);
    }

    @Operation(summary = "회원탈퇴", description = "회원탈퇴")
    @DeleteMapping
    public CommonResponse<Void> memberRemove() {
        memberService.removeMember(userPrincipal.getLoginId());

        return OK(null);
    }

    @Operation(summary = "회원조회", description = "회원조회")
    @GetMapping
    public CommonResponse<MemberDetailResponseDto> memberDetails() {
        return OK(memberService.findMember(userPrincipal.getLoginId()));
    }

    @Operation(summary = "회원수정", description = "회원수정")
    @Parameters({
            @Parameter(name = "memberModifyRequestDto", description = "변경할 회원 정보")
    })
    @PutMapping
    public CommonResponse<Boolean> memberModify(
            @RequestBody MemberModifyRequestDto memberModifyRequestDto
    ) {
        return OK(memberService.modifyMember(memberModifyRequestDto, userPrincipal.getLoginId()));
    }

}