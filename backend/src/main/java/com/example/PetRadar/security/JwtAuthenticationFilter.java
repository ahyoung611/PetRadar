package com.example.PetRadar.security;

import com.example.PetRadar.user.User;
import com.example.PetRadar.user.UserDTO;
import com.example.PetRadar.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken == null) bearerToken = request.getParameter("token");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String accessToken = bearerToken.substring(7);
            try {
                if (jwtTokenProvider.validateAccessToken(accessToken)) {
                    authenticate(accessToken, request);
                } else {
                    String refreshToken = extractRefreshTokenFromCookie(request);
                    if (refreshToken != null && jwtTokenProvider.validateRefreshToken(refreshToken)) {
                        String userId = jwtTokenProvider.getUserIdFromRefreshToken(refreshToken);
                        String newAccessToken = jwtTokenProvider.createAccessToken(userId);
                        response.setHeader("Authorization", newAccessToken);
                        authenticate(newAccessToken, request);
                    }else {
                        response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid refresh token");
                        return;
                    }
                }
            }catch (Exception e) {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Authentication failed: " + e.getMessage());
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void authenticate(String accessToken, HttpServletRequest request) {
        String userId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
        UserDTO userDTO = userService.findById(Long.parseLong(userId));
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                String.valueOf(userDTO.getId()),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}