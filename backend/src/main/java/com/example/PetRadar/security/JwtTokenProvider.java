package com.example.PetRadar.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    // 보안 강화를 위해 액세스 토큰과 리프레시 토큰에 다른 서명 키를 사용
    private final Key accessTokenKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final Key refreshTokenKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 액세스 토큰 유효 기간 (10분)
    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 10;
    // 리프레시 토큰 유효 기간 (하루)
    private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24;

    public long getRefreshTokenExpSec() {
        return REFRESH_TOKEN_EXPIRATION / 1000; // 밀리초 -> 초 변환
    }

    public String createAccessToken(String userId) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRATION))
                .signWith(accessTokenKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String userId) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRATION))
                .signWith(refreshTokenKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateAccessToken(String accessToken) {
        try {
            Jwts.parserBuilder().setSigningKey(accessTokenKey).build().parseClaimsJws(accessToken);
            return true;
        } catch (SignatureException | ExpiredJwtException e) {
            // 토큰 서명이 유효하지 않거나 만료된 경우
            return false;
        } catch (Exception e) {
            // 기타 다른 예외 처리
            return false;
        }
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(refreshTokenKey).build().parseClaimsJws(refreshToken);
            return true;
        } catch (SignatureException | ExpiredJwtException e) {
            return false;
        } catch (Exception e){
            // 기타 예외
            return false;
        }
    }


    public String getUserIdFromAccessToken(String accessToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(accessTokenKey)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();
        return claims.getSubject();
    }

    public String getUserIdFromRefreshToken(String refreshToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(refreshTokenKey)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();
        return claims.getSubject();
    }
}
