package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.FileNoteDto;
import com.goNutsCoding.evolvedVision.entity.FileNote;
import com.goNutsCoding.evolvedVision.mapper.FileNoteMapper;
import com.goNutsCoding.evolvedVision.repository.FileNoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FileNoteService {

    @Autowired
    private FileNoteRepo fileNoteRepo;

    public Set<FileNoteDto> getFileNotesByMemberId(UUID memberId, Set<ARAssetDto> arAssetsByMemberId) {
        Set<FileNoteDto> fileNoteDtos = new HashSet<>();
        Set<FileNote> fileNotes = fileNoteRepo.findByMemberId(memberId);
        fileNotes.iterator().forEachRemaining(fileNote -> {
            FileNoteDto fileNoteDto = FileNoteMapper.mapFileNoteToFileNoteDto(
                    fileNote,
                    arAssetsByMemberId);
            fileNoteDtos.add(fileNoteDto);
        });

        return fileNoteDtos;
    }

    public FileNote saveFileNote(FileNote fileNote) {
        return fileNoteRepo.save(fileNote);
    }

    public Set<FileNoteDto> getAllFileNotes(Set<ARAssetDto> arAssets) {
        Set<FileNoteDto> fileNoteDtos = new HashSet<>();
        List<FileNote> fileNotes = fileNoteRepo.findAll();
        Set<FileNote> fileNoteSet = new HashSet<>(fileNotes);
        Map<UUID, Set<ARAssetDto>> assetDtoMap = getAssetDtoMap(arAssets);

        fileNoteSet.iterator().forEachRemaining(fileNote -> {
            FileNoteDto fileNoteDto = FileNoteMapper.mapFileNoteToFileNoteDto(
                    fileNote,
                    assetDtoMap.get(fileNote.getId()));
            fileNoteDtos.add(fileNoteDto);
        });

        return fileNoteDtos;
    }

    private Map<UUID, Set<ARAssetDto>> getAssetDtoMap(Set<ARAssetDto> arAssets) {
        Map<UUID, Set<ARAssetDto>> assetDtoMap = new HashMap<>();
        arAssets.iterator().forEachRemaining(arAssetDto -> {

            if (assetDtoMap.containsKey(arAssetDto.getFileNoteId()))
                assetDtoMap.get(arAssetDto.getFileNoteId()).add(arAssetDto);
            else
                assetDtoMap.put(arAssetDto.getFileNoteId(), new HashSet<>(List.of(arAssetDto)));
        });

        // arAssets.iterator().forEachRemaining(arAssetDto -> assetDtoMap
        // .get(assetDtoMap.putIfAbsent(arAssetDto.getFileNoteId(), new
        // HashSet<>())).add(arAssetDto));

        return assetDtoMap;
    }
}
