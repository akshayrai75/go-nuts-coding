package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.FileNoteDto;
import com.goNutsCoding.evolvedVision.entity.FileNote;
import com.goNutsCoding.evolvedVision.mapper.FileNoteMapper;
import com.goNutsCoding.evolvedVision.repository.FileNoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
                    arAssetsByMemberId
            );
            fileNoteDtos.add(fileNoteDto);
        });

        return fileNoteDtos;
    }

    public FileNote saveFileNote(FileNote fileNote) {
        return fileNoteRepo.save(fileNote);
    }
}
