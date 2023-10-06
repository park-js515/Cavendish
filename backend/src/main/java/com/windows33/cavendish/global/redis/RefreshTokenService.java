package com.windows33.cavendish.global.redis;

import com.windows33.cavendish.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveRefreshToken(String id, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(id, refreshToken, accessToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        refreshTokenRepository.findByAccessToken(accessToken)
                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
    }

    @Transactional
    public RefreshToken findRefreshToken(String accessToken) {
        return refreshTokenRepository.findByAccessToken(accessToken).orElseThrow(() -> new NotFoundException(RefreshToken.class, accessToken));
    }

}
