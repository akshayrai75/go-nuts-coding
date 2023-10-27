package com.goNutsCoding.evolvedVision.mapper;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.FileNoteDto;
import com.goNutsCoding.evolvedVision.entity.FileNote;

import java.util.Set;

public class FileNoteMapper {
    public static FileNoteDto mapFileNoteToFileNoteDto(FileNote fileNote, Set<ARAssetDto> arAssetsByMemberId) {
        return new FileNoteDto(
                fileNote.getId(),
                fileNote.getCreated(),
                fileNote.getLastModified(),
                fileNote.getFileAddress(),
                fileNote.getNotes(),
                arAssetsByMemberId
        );
    }
}
