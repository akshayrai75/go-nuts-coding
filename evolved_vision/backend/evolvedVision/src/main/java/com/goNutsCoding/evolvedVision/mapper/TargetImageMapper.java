package com.goNutsCoding.evolvedVision.mapper;

import com.goNutsCoding.evolvedVision.dto.TargetImageDto;
import com.goNutsCoding.evolvedVision.entity.TargetImage;

public class TargetImageMapper {
    public static TargetImageDto mapTargetImageToTargetImageDto(TargetImage targetImage) {
        return new TargetImageDto(
                targetImage.getId(),
                targetImage.getCreated(),
                targetImage.getLastModified(),
                targetImage.getImageAddress(),
                targetImage.getIsPublic()
        );
    }
}
