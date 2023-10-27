package com.goNutsCoding.evolvedVision.repository;

import com.goNutsCoding.evolvedVision.entity.ARContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ARContentRepo extends JpaRepository<ARContent, UUID> {
    ARContent findByArAssetId(UUID arAssetId);
}