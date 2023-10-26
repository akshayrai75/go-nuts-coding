package com.goNutsCoding.evolvedVision.dto;

import com.goNutsCoding.evolvedVision.entity.MemberStatus;
import com.goNutsCoding.evolvedVision.entity.Role;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;
import java.util.UUID;

@Data
public class MemberDto implements Serializable {
    private final UUID id;
    private final Date created;
    private final Date lastModified;
    private final Role role;
    private final String username;
    private final MemberStatus status;
    private final Set<ARAssetDto> arAssets;
    private final Set<FileNoteDto> fileNotes;
}
