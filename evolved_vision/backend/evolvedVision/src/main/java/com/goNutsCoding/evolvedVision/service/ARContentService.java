package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARContentDto;
import com.goNutsCoding.evolvedVision.entity.ARContent;
import com.goNutsCoding.evolvedVision.mapper.ARContentMapper;
import com.goNutsCoding.evolvedVision.repository.ARContentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ARContentService {

    @Autowired
    private ARContentRepo arContentRepo;

    public ARContentDto getARContentByARAssetId(UUID arAssetId) {
        ARContent arContent = arContentRepo.findByArAssetId(arAssetId);
        return ARContentMapper.mapARContentToARContentDto(arContent);
    }

    public ARContent saveARContent(ARContent arContent) {
        return arContentRepo.save(arContent);
    }

    public List<ARContentDto> getAllARContent() {
        List<ARContent> arContents = arContentRepo.findAll();
        List<ARContentDto> arContentDtos = new ArrayList<>();

        arContents.forEach(arContent -> arContentDtos.add(ARContentMapper.mapARContentToARContentDto(arContent)));

        return arContentDtos;
    }
}
