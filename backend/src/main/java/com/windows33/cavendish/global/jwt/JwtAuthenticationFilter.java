package com.windows33.cavendish.global.jwt;

import com.windows33.cavendish.domain.member.entity.Member;
import com.windows33.cavendish.domain.member.repository.MemberRepository;
import com.windows33.cavendish.domain.member.service.MemberService;
import com.windows33.cavendish.global.exception.JwtTokenException;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.redis.RefreshTokenService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String accessToken = resolveToken((HttpServletRequest) request);

        if(accessToken != null && jwtTokenProvider.isExpired(accessToken)) {
            throw new JwtTokenException("Jwt exception");

//            String refreshToken = refreshTokenService.findRefreshToken(accessToken).getRefreshToken();
//
//            if(refreshToken != null && jwtTokenProvider.isExpired(refreshToken)) {
//                refreshTokenService.removeRefreshToken(accessToken);
//
//                String id = refreshTokenService.findRefreshToken(accessToken).getId();
//                Member member = memberRepository.findByLoginId(id).orElseThrow(() -> new NotFoundException(Member.class, id));
//                accessToken = memberService.login(member.getLoginId(), member.getPassword());
//                final HttpServletResponse httpServletResponse = (HttpServletResponse) response;
//                httpServletResponse.setHeader("accessToken", "bearer" + accessToken);
//            } else {
//                throw new JwtException(String.class, refreshToken);
//            }
        }

        if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
            Authentication jwtAuthentication = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
        } else {
            throw new JwtTokenException("Jwt exception");
        }

        throw new JwtTokenException("Jwt exception");

//        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}