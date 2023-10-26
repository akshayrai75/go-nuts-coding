package com.goNutsCoding.evolvedVision.repository;

import com.goNutsCoding.evolvedVision.entity.FileNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface FileNoteRepo extends JpaRepository<FileNote, UUID> {
    Set<FileNote> findByMemberId(UUID memberId);
}
