package com.example.PetRadar.report;

import com.example.PetRadar.missing.Missing;
import com.example.PetRadar.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Lob
    private String petImage;

    private String petReportPlace;

    @Column(columnDefinition = "DECIMAL(10, 8)")
    private Double latitude;

    @Column(columnDefinition = "DECIMAL(11, 8)")
    private Double longitude;

    // petMissingId는 Missing Entity와 연결됩니다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_missing_id", nullable = false)
    private Missing missing;

    // userId는 User Entity와 연결됩니다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
