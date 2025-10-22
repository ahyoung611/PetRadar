package com.example.PetRadar.auth;

import com.example.PetRadar.security.JwtTokenProvider;
import com.example.PetRadar.user.User;
import com.example.PetRadar.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        Optional<User> userOptional = userService.findByLoginId(authDTO.getId());
        // 사용자가 존재하지 않는 경우
        if (userOptional.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");
            return ResponseEntity.status(401).body(errorResponse);
        }
        User user = userOptional.get();
        // PasswordEncoder를 사용하여 비밀번호 비교
        // 사용자가 입력한 평문 비밀번호와 DB의 암호화된 비밀번호를 비교
        if (!passwordEncoder.matches(authDTO.getPw(), user.getPwHash())) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");
            return ResponseEntity.status(401).body(errorResponse);
        }
        // 액세스 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(user.getId()));
        // 리프레시 토큰 생성
        String refreshToken = jwtTokenProvider.createRefreshToken(String.valueOf(user.getId()));
        // 리프레시 토큰을 HttpOnly 쿠키로 설정
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                //.secure(true) // HTTPS 환경에서만 전송, 개발환경이 HTTP이므로 임시 주석처리
                .path("/api")
                .maxAge(jwtTokenProvider.getRefreshTokenExpSec())
                .build();
        // 액세스 토큰은 JSON 응답으로, 리프레시 토큰은 쿠키 헤더에 담아 전송
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthDTO authDTO) {
        userService.registerUser(authDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-exist")
    public ResponseEntity<Boolean> checkExist(@RequestParam String id) {
        boolean isExist = userService.findByLoginId(id).isPresent();
        return ResponseEntity.ok(isExist);
    }
}
