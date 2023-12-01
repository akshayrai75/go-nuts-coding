package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.TargetImageDto;
import com.goNutsCoding.evolvedVision.entity.TargetImage;
import com.goNutsCoding.evolvedVision.mapper.TargetImageMapper;
import com.goNutsCoding.evolvedVision.repository.TargetImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TargetImageService {

    @Autowired
    private TargetImageRepo targetImageRepo;

    public TargetImageDto getTargetImageByARAssetId (UUID arAssetId) {
        TargetImage targetImage = targetImageRepo.findByArAssetId(arAssetId);
        return TargetImageMapper.mapTargetImageToTargetImageDto(targetImage);
    }

    public TargetImage saveTargetImage(TargetImage targetImage) {
        return targetImageRepo.save(targetImage);
    }

    public List<TargetImageDto> getAllTargetImages() {
        List<TargetImage> targetImages = targetImageRepo.findAll();
        List<TargetImageDto> targetImageDtos = new ArrayList<>();

        targetImages.forEach(arContent -> targetImageDtos.add(
                TargetImageMapper.mapTargetImageToTargetImageDto(arContent)));

        return targetImageDtos;
    }
}
