package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.ARContentDto;
import com.goNutsCoding.evolvedVision.dto.TargetImageDto;
import com.goNutsCoding.evolvedVision.entity.ARAsset;
import com.goNutsCoding.evolvedVision.mapper.ARAssetMapper;
import com.goNutsCoding.evolvedVision.repository.ARAssetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public Set<ARAssetDto> getAllARAssets() {
        Set<ARAssetDto> arAssetDtos = new HashSet<>();
        List<ARAsset> arAssets = arAssetRepo.findAll();
        List<ARContentDto> arContentDtos = arContentService.getAllARContent();
        List<TargetImageDto> targetImageDtos = targetImageService.getAllTargetImages();

        Map<UUID, ARContentDto> arContentDtoMap = getArContentDtoMap(arContentDtos);
        Map<UUID, TargetImageDto> targetImageDtoMap = getTargetImageDtoMap(targetImageDtos);

        arAssets.forEach(arAsset -> {
            ARAssetDto assetDto = ARAssetMapper.mapARAssetToARAssetDto(
                    arAsset,
                    arContentDtoMap.get(arAsset.getId()),
                    targetImageDtoMap.get(arAsset.getId())
            );
            arAssetDtos.add(assetDto);
        });

        return arAssetDtos;
    }

    private Map<UUID, TargetImageDto> getTargetImageDtoMap(List<TargetImageDto> targetImageDtos) {
        Map<UUID, TargetImageDto> targetImageDtoMap = new HashMap<>();
        targetImageDtos.forEach(targetImageDto -> targetImageDtoMap.put(targetImageDto.getArAssetId(), targetImageDto));
        return targetImageDtoMap;
    }

    private Map<UUID, ARContentDto> getArContentDtoMap(List<ARContentDto> arContentDtos) {
        Map<UUID, ARContentDto> arContentDtoMap = new HashMap<>();
        arContentDtos.forEach(arContentDto -> arContentDtoMap.put(arContentDto.getArAssetId(), arContentDto));
        return arContentDtoMap;
    }
}
