package com.windows33.cavendish.domain.member.controller;

import com.windows33.cavendish.domain.member.dto.MemberLoginRequestDto;
import com.windows33.cavendish.domain.member.dto.TokenInfo;
import com.windows33.cavendish.domain.member.service.MemberService;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Member", description = "회원 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "로그인", description = "로그인")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "회원 정보")
    })
    @PostMapping("/login")
    public CommonResponse<TokenInfo> login(
            @RequestBody MemberLoginRequestDto memberLoginRequestDto
    ) {
        String memberId = memberLoginRequestDto.getMemberId();
        String password = memberLoginRequestDto.getPassword();

        TokenInfo tokenInfo = memberService.login(memberId, password);

        return CommonResponse.OK(tokenInfo);
    }

//    @PostMapping("/test")
//    public String test() {
//        return "success";
//    }

}