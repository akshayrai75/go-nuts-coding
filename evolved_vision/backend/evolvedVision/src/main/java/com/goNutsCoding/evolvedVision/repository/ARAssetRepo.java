package com.goNutsCoding.evolvedVision.repository;

import com.goNutsCoding.evolvedVision.entity.ARAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface ARAssetRepo extends JpaRepository<ARAsset, UUID> {
    Set<ARAsset> findByMemberId(UUID userId);
}
