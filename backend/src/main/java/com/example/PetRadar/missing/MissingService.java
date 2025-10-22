package com.example.PetRadar.missing;

import com.example.PetRadar.notification.NotificationService;
import com.example.PetRadar.user.User;
import com.example.PetRadar.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MissingService {
    private final MissingRepository missingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public List<MissingDTO> getMissingList(String searchInput, Sort sort) {
        return missingRepository.findByTitleContainingIgnoreCase(searchInput, sort).stream()
                .map(MissingDTO::from)
                .collect(Collectors.toList());
    }

    public List<MissingDTO> getMissingList(Long userId, Sort sort){
        return missingRepository.findByUserIdWithUser(userId, sort).stream()
                .map(MissingDTO::from)
                .collect(Collectors.toList());
    }

    public MissingDTO getMissingDetail(Long id) {
        Missing missing = missingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 없습니다."));
        return MissingDTO.from(missing);
    }

    public void createMissing(long userId, Missing missing) {
        missing.setUser(userRepository.getReferenceById(userId));
        missingRepository.save(missing);
        notificationService.createNotificationToAllUsers(userId,"missing", missing.getId());
    }

    public void updateMissing(Long id, Missing updatedMissing, long userId) {
        Missing existingMissing = missingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Missing post not found."));
        if (!existingMissing.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to update this post.");
        }
        existingMissing.setPetName(updatedMissing.getPetName());
        existingMissing.setPetType(updatedMissing.getPetType());
        existingMissing.setPetGender(updatedMissing.getPetGender());
        existingMissing.setPetBreed(updatedMissing.getPetBreed());
        existingMissing.setPetAge(updatedMissing.getPetAge());
        existingMissing.setPetMissingDate(updatedMissing.getPetMissingDate());
        existingMissing.setLatitude(updatedMissing.getLatitude());
        existingMissing.setLongitude(updatedMissing.getLongitude());
        existingMissing.setPetImage(updatedMissing.getPetImage());
        existingMissing.setTitle(updatedMissing.getTitle());
        existingMissing.setContent(updatedMissing.getContent());
        missingRepository.save(existingMissing);
    }

    public void deleteMissing(Long missingId, Long userId) {
        Missing missing = missingRepository.findById(missingId)
                .orElseThrow(() -> new IllegalArgumentException("Missing report not found."));
        if (!missing.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to delete this post.");
        }
        missingRepository.delete(missing);
    }
}
