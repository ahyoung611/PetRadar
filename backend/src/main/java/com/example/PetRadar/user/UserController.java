package com.example.PetRadar.user;

import com.example.PetRadar.auth.AuthDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = Long.parseLong(userDetails.getUsername());
        UserDTO userDto = userService.findById(userId);
        return ResponseEntity.ok(userDto);
    }

    @PatchMapping("/me")
    public ResponseEntity<String> updateUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AuthDTO authDTO) {
        try {
            Long userId = Long.parseLong(userDetails.getUsername());
            userService.updateUser(userId, authDTO);
        }catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = Long.parseLong(userDetails.getUsername());
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
