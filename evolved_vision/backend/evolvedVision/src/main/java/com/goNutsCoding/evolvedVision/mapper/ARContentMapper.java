package com.goNutsCoding.evolvedVision.mapper;

import com.goNutsCoding.evolvedVision.dto.ARContentDto;
import com.goNutsCoding.evolvedVision.entity.ARContent;

public class ARContentMapper {
    public static ARContentDto mapARContentToARContentDto(ARContent arContent) {
        return new ARContentDto(
                arContent.getId(),
                arContent.getCreated(),
                arContent.getLastModified(),
                arContent.getContentHeader(),
                arContent.getContentBody()
        );
    }
}
