package com.example.PetRadar.notification;

import com.example.PetRadar.user.User;
import com.example.PetRadar.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void createNotificationToUser(Long senderId, Long receiverId, String postType, Long postId) {
        User sender = null;
        if (senderId != null) {
            sender = userRepository.findById(senderId)
                    .orElse(null);
        }
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found with ID: " + receiverId));
        Notification notification = new Notification();
        notification.setSender(sender);
        notification.setReceiver(receiver);
        notification.setPostType(postType);
        notification.setPostId(postId);
        notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(receiverId), "/queue/notification", NotificationDTO.from(notification));
    }

    @Async
    public void createNotificationToAllUsers(Long senderId, String postType, Long postId) {
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            if(user.getId().equals(senderId)) continue;
            createNotificationToUser(senderId, user.getId(), postType, postId);
        }
    }

    public List<NotificationDTO> findByReceiverId(Long receiverId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(receiverId).stream()
                .map(NotificationDTO::from)
                .collect(Collectors.toList());
    }

    public void deleteNotification(Long receiverId, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found with ID: " + notificationId));
        if (!notification.getReceiver().getId().equals(receiverId)) {
            throw new IllegalArgumentException("Notification does not belong to this user");
        }
        notificationRepository.delete(notification);
    }


}
