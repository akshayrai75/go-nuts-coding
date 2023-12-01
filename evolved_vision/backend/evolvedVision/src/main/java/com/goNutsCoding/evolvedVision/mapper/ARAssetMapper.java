package com.goNutsCoding.evolvedVision.mapper;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.ARContentDto;
import com.goNutsCoding.evolvedVision.dto.TargetImageDto;
import com.goNutsCoding.evolvedVision.entity.ARAsset;

public class ARAssetMapper {
    public static ARAssetDto mapARAssetToARAssetDto(ARAsset arAsset, ARContentDto arContentDto,
                                                    TargetImageDto targetImageDto) {
        return new ARAssetDto(
                arAsset.getId(),
                arAsset.getCreated(),
                arAsset.getLastModified(),
                arAsset.getArOverlay(),
                arContentDto,
                targetImageDto,
                arAsset.getTakeNotes(),
                arAsset.getFileNote().getId()
        );
    }
}
