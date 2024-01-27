package com.platform.projapp.service;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import com.platform.projapp.property.AppProperties;
import com.platform.projapp.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final AppProperties appProperties;

    private final RefreshTokenRepository tokenRepository;


    public RefreshToken findByToken(UUID token) {
        return tokenRepository.findByToken(token);
    }

    public RefreshToken findByUser(String userLogin) {
        return tokenRepository.findByUserLogin(userLogin);
    }

    public RefreshToken createRefreshToken(String userLogin) {
        RefreshToken refreshToken;
        var token = UUID.randomUUID();
        var expiryDate = ZonedDateTime.now().plus(appProperties.getRefreshExpirationMs(), ChronoUnit.MILLIS);
        if ((refreshToken = findByUser(userLogin)) != null) {
            refreshToken.setToken(token);
            refreshToken.setExpiryDate(expiryDate);
        } else refreshToken = new RefreshToken(token, expiryDate, userLogin);
        tokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        if (refreshToken.getExpiryDate().isBefore(ZonedDateTime.now())) {
            tokenRepository.delete(refreshToken);
            throw new RuntimeException("refresh token is dead");
        }
        return refreshToken;
    }
}
