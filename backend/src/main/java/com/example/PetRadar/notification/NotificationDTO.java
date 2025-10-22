package com.example.PetRadar.notification;

import com.example.PetRadar.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationDTO {
    private Long id;
    private String receiverId;
    private String senderId;
    private String postType;
    private Long postId;

    public static NotificationDTO from(Notification notification) {
        String senderId = null;
        if(notification.getSender() != null){
            senderId = notification.getSender().getLoginId();
        }
        return new NotificationDTO(
                notification.getId(),
                notification.getReceiver().getLoginId(),
                senderId,
                notification.getPostType(),
                notification.getPostId()
        );
    }
}
