package com.example.PetRadar.report;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/report")
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/{reportId}")
    public ResponseEntity<ReportDTO> getReportDetail(@PathVariable Long reportId) {
        ReportDTO reportDTO = reportService.findReportById(reportId);
        return ResponseEntity.ok(reportDTO);
    }

    @PostMapping("/missing/{missingId}")
    public ResponseEntity<Void> createReport(@PathVariable Long missingId, @AuthenticationPrincipal UserDetails userDetails, @RequestBody Report report) {
        reportService.createReport(userDetails != null ? Long.parseLong(userDetails.getUsername()) : null, missingId, report);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/missing/{missingId}")
    public ResponseEntity<Page<ReportDTO>> getReportsByMissingId(@PathVariable Long missingId, Pageable pageable) {
        Page<ReportDTO> reportPage = reportService.getReportsByMissingId(missingId, pageable);
        return ResponseEntity.ok(reportPage);
    }

}
