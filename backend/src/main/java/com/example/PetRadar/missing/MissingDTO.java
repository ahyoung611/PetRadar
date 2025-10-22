package com.example.PetRadar.missing;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MissingDTO {
    private Long id;
    private Long userId;
    private String petName;
    private String petType;
    private String petGender;
    private String petBreed;
    private String petAge;
    private String petMissingDate;
    private String petMissingPlace;
    private PetMissingPoint petMissingPoint;
    private String petImage;
    private String title;
    private String content;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PetMissingPoint{
        private Double lat;
        private Double lng;
    }

    public static MissingDTO from(Missing missing) {
        PetMissingPoint point = null;
        if (missing.getLatitude() != null && missing.getLongitude() != null) {
            point = new PetMissingPoint(missing.getLatitude(), missing.getLongitude());
        }
        return new MissingDTO(
                missing.getId(),
                missing.getUser().getId(),
                missing.getPetName(),
                missing.getPetType(),
                missing.getPetGender(),
                missing.getPetBreed(),
                missing.getPetAge(),
                missing.getPetMissingDate(),
                missing.getPetMissingPlace(),
                point,
                missing.getPetImage(),
                missing.getTitle(),
                missing.getContent()
        );
    }
}

