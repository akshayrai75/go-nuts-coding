package com.goNutsCoding.evolvedVision.repository;

import com.goNutsCoding.evolvedVision.entity.TargetImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TargetImageRepo extends JpaRepository<TargetImage, UUID> {
    TargetImage findByArAssetId(UUID arAssetId);
}