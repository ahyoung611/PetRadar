package com.example.PetRadar.missing;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/missing")
public class MissingController {
    private final MissingService missingService;

    @GetMapping
    public ResponseEntity<List<MissingDTO>> getMissingList(@RequestParam(defaultValue = "") String searchInput, @RequestParam(defaultValue = "latest") String sortType) {
        Sort sort;
        if ("oldest".equals(sortType)) {
            sort = Sort.by(Sort.Direction.ASC, "createdAt");
        } else {
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        }
        List<MissingDTO> missingList = missingService.getMissingList(searchInput, sort);
        return ResponseEntity.ok(missingList);
    }

    @GetMapping("/me")
    public ResponseEntity<List<MissingDTO>> getMissingList(@AuthenticationPrincipal UserDetails userDetails, @SortDefault(sort = "createdAt", direction = Sort.Direction.DESC) Sort sort) {
        List<MissingDTO> missingList = missingService.getMissingList(Long.parseLong(userDetails.getUsername()), sort);
        return ResponseEntity.ok(missingList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissingDTO> getMissingDetail(@PathVariable Long id) {
        MissingDTO detail = missingService.getMissingDetail(id);
        return ResponseEntity.ok(detail);
    }

    @PostMapping
    public ResponseEntity<Void> createMissing(@RequestBody Missing missing, @AuthenticationPrincipal UserDetails userDetails) {
        missingService.createMissing(Long.parseLong(userDetails.getUsername()), missing);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateMissing(@PathVariable Long id, @RequestBody Missing missing, @AuthenticationPrincipal UserDetails userDetails){
        missingService.updateMissing(id, missing, Long.parseLong(userDetails.getUsername()));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMissing(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        missingService.deleteMissing(id, Long.parseLong(userDetails.getUsername()));
        return ResponseEntity.ok().build();
    }

}
