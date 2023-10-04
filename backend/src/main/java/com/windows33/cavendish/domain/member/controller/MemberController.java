package com.windows33.cavendish.domain.member.controller;

import com.windows33.cavendish.domain.member.dto.request.MemberLoginRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.service.MemberService;
import com.windows33.cavendish.global.jwt.UserPrincipal;
import com.windows33.cavendish.global.redis.RefreshTokenService;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import static com.windows33.cavendish.global.response.CommonResponse.*;

@Tag(name = "Member", description = "회원 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
//    private final RefreshTokenService refreshTokenService;

    @Operation(summary = "로그인", description = "로그인")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "회원 정보")
    })
    @PostMapping("/login")
    public CommonResponse<String> login(
            @RequestBody MemberLoginRequestDto memberLoginRequestDto,
            HttpServletResponse response
    ) {
        String memberId = memberLoginRequestDto.getLoginId();
        String password = memberLoginRequestDto.getPassword();
        String accessToken = memberService.login(memberId, password);
//        response.setHeader("accessToken", "bearer" + accessToken);

        return CommonResponse.OK(accessToken);
    }
    
//    @Operation(summary = "로그아웃", description = "로그아웃")
//    @PostMapping("/logout")
//    public CommonResponse<Void> logout(
//            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
//    ) {
//        return CommonResponse.OK(null);
//    }

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
    public CommonResponse<Void> memberRemove(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        memberService.removeMember(userPrincipal.getId());

        return OK(null);
    }

    @Operation(summary = "회원조회", description = "회원조회")
    @GetMapping
    public CommonResponse<MemberDetailResponseDto> memberDetails(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return OK(memberService.findMember(userPrincipal.getId()));
    }

    @Operation(summary = "회원수정", description = "회원수정")
    @Parameters({
            @Parameter(name = "memberModifyRequestDto", description = "변경할 회원 정보")
    })
    @PutMapping
    public CommonResponse<Boolean> memberModify(
            @RequestBody MemberModifyRequestDto memberModifyRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return OK(memberService.modifyMember(memberModifyRequestDto, userPrincipal.getId()));
    }

}