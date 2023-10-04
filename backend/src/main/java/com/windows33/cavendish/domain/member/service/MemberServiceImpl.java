package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.entity.Member;
import com.windows33.cavendish.domain.member.repository.MemberRepository;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.jwt.JwtTokenProvider;
import com.windows33.cavendish.global.redis.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
//    private final RefreshTokenService refreshTokenService;

    @Override
    public String login(String loginId, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);

        // authenticate() -> CustomUserDetailsService.loadUserByUsername()
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String accessToken = jwtTokenProvider.createAccessToken(authentication);
//        String refreshToken = jwtTokenProvider.createRefreshToken();
//        refreshTokenService.saveRefreshToken(loginId, refreshToken, accessToken);

        return accessToken;
    }

    @Override
    public void signup(MemberSignupRequestDto memberSignupRequestDto) {
        memberRepository.save(Member.builder()
                .loginId(memberSignupRequestDto.getLoginId())
                .password(passwordEncoder.encode(memberSignupRequestDto.getPassword()))
                .nickname(memberSignupRequestDto.getNickname())
                .build()
        );
    }

    @Override
    public void removeMember(Integer id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotFoundException(Member.class, id));

        memberRepository.delete(member);
    }

    @Override
    public MemberDetailResponseDto findMember(Integer id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotFoundException(Member.class, id));
        MemberDetailResponseDto memberDetailResponseDto = new MemberDetailResponseDto(member.getLoginId(), member.getNickname());

        return memberDetailResponseDto;
    }

    @Override
    public Boolean modifyMember(MemberModifyRequestDto memberModifyRequestDto, Integer id) {
        String password = memberModifyRequestDto.getPassword();
        String nickname = memberModifyRequestDto.getNickname();

        Member member = memberRepository.findById(id).orElseThrow(() -> new NotFoundException(Member.class, id));

        if(!member.getPassword().equals(password)) return false;

        member.updateMember(nickname);
        Member check = memberRepository.save(member);

        if(!check.getNickname().equals(nickname)) return false;

        return true;
    }

}