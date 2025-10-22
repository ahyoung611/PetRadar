package com.example.PetRadar.missing;

import com.example.PetRadar.report.Report;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.example.PetRadar.user.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "missing")
public class Missing{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "missing", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();

    @Column(nullable = false)
    private String petName;

    @Column(nullable = false)
    private String petType;

    @Column(nullable = false)
    private String petGender;

    private String petBreed;

    @Column(nullable = false)
    private String petAge;

    @Column(nullable = false)
    private String petMissingDate;

    @Column(nullable = false)
    private String petMissingPlace;

    @Column(columnDefinition = "DECIMAL(10, 8)")
    private Double latitude;

    @Column(columnDefinition = "DECIMAL(11, 8)")
    private Double longitude;

    @Lob
    private String petImage;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}