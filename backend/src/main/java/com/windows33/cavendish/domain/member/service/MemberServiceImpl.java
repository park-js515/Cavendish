package com.windows33.cavendish.domain.member.service;

import com.windows33.cavendish.domain.member.dto.response.MemberDetailResponseDto;
import com.windows33.cavendish.domain.member.dto.request.MemberModifyRequestDto;
import com.windows33.cavendish.domain.member.dto.request.MemberSignupRequestDto;
import com.windows33.cavendish.domain.member.dto.TokenInfo;
import com.windows33.cavendish.domain.member.entity.Member;
import com.windows33.cavendish.domain.member.repository.MemberRepository;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenInfo login(String loginId, String password) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;
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