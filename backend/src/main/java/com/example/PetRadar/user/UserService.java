package com.example.PetRadar.user;

import com.example.PetRadar.auth.AuthDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private void validateUserRegistration(AuthDTO authDTO) {
        final String HP_REGEX = "^01[0-9]{1}-\\d{3,4}-\\d{4}$";
        final String PW_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$";

        if (authDTO.getHp() == null || authDTO.getHp().isBlank()) {
            throw new IllegalArgumentException("휴대폰 번호를 입력해주세요.");
        }
        if (!Pattern.matches(HP_REGEX, authDTO.getHp())) {
            throw new IllegalArgumentException("유효한 휴대폰 번호 형식이 아닙니다.");
        }
        if (authDTO.getPw() == null || authDTO.getPw().isEmpty()) {
            throw new IllegalArgumentException("비밀번호를 입력해주세요.");
        }
        if (!Pattern.matches(PW_REGEX, authDTO.getPw())) {
            throw new IllegalArgumentException("비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
        }
    }

    @Transactional
    public void registerUser(AuthDTO authDTO) {
        // 회원가입 시 유효성 검사를 수행합니다.
        validateUserRegistration(authDTO);
        User user = new User();
        user.setLoginId(authDTO.getId());
        user.setHp(authDTO.getHp());
        user.setPwHash(passwordEncoder.encode(authDTO.getPw()));
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(user.getId(), user.getLoginId(), user.getHp()))
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    }

    @Transactional(readOnly = true)
    public Optional<User> findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId);
    }

    @Transactional
    public void updateUser(Long userId, AuthDTO authDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        validateUserRegistration(authDTO);
        user.setHp(authDTO.getHp());
        user.setPwHash(passwordEncoder.encode(authDTO.getPw()));
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        userRepository.delete(user);
    }
}