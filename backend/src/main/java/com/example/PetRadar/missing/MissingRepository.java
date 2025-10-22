package com.example.PetRadar.missing;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MissingRepository extends JpaRepository<Missing, Long> {
    List<Missing> findByTitleContainingIgnoreCase(String title, Sort sort);
    @Query("SELECT m FROM Missing m JOIN FETCH m.user WHERE m.user.id = :userId")
    List<Missing> findByUserIdWithUser(Long userId, Sort sort);
}