package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.entity.ARAsset;
import com.goNutsCoding.evolvedVision.mapper.ARAssetMapper;
import com.goNutsCoding.evolvedVision.repository.ARAssetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class ARAssetService {

    @Autowired
    private ARAssetRepo arAssetRepo;

    @Autowired
    private ARContentService arContentService;

    @Autowired
    private TargetImageService targetImageService;

    public Set<ARAssetDto> getARAssetsByMemberId(UUID userId) {
        Set<ARAssetDto> arAssetDtos = new HashSet<>();
        Set<ARAsset> arAssets = arAssetRepo.findByMemberId(userId);
        arAssets.iterator().forEachRemaining(arAsset -> {
            ARAssetDto assetDto = ARAssetMapper.mapARAssetToARAssetDto(
                    arAsset,
                    arContentService.getARContentByARAssetId(arAsset.getId()),
                    targetImageService.getTargetImageByARAssetId(arAsset.getId())
            );
            arAssetDtos.add(assetDto);
        });

        return arAssetDtos;
    }

    public ARAsset saveARAsset(ARAsset arAsset) {
        return arAssetRepo.save(arAsset);
    }
}
