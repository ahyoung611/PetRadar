package com.example.PetRadar.report;

import com.example.PetRadar.missing.Missing;
import com.example.PetRadar.missing.MissingRepository;
import com.example.PetRadar.notification.NotificationService;
import com.example.PetRadar.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final MissingRepository missingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public ReportDTO findReportById(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 없습니다."));
        return ReportDTO.from(report);
    }

    public Page<ReportDTO> getReportsByMissingId(Long missingId, Pageable pageable) {
        Page<Report> reportPage = reportRepository.findByMissingId(missingId, pageable);
        List<ReportDTO> reportDTOList = reportPage.stream()
                .map(ReportDTO::from)
                .collect(Collectors.toList());
        return new PageImpl<>(reportDTOList, pageable, reportPage.getTotalElements());
    }

    public void createReport(Long userId, Long missingId, Report report) {
        if(userId != null) report.setUser(userRepository.getReferenceById(userId));
        Missing missing = missingRepository.findById(missingId)
                .orElseThrow(() -> new IllegalArgumentException("Missing post not found with ID: " + missingId));
        report.setMissing(missing);
        reportRepository.save(report);
        notificationService.createNotificationToUser(userId, missing.getUser().getId(), "report", missingId);
    }
}