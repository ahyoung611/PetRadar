package com.example.PetRadar.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/me")
    public ResponseEntity<List<NotificationDTO>> getNotificationsForUser(@AuthenticationPrincipal UserDetails userDetails) {
        Long receiverId = Long.parseLong(userDetails.getUsername());
        List<NotificationDTO> notifications = notificationService.findByReceiverId(receiverId);
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId, @AuthenticationPrincipal UserDetails userDetails) {
        Long receiverId = Long.parseLong(userDetails.getUsername());
        notificationService.deleteNotification(receiverId, notificationId);
        return ResponseEntity.ok().build();
    }
}
