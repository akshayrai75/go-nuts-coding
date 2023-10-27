package com.goNutsCoding.evolvedVision.dto;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;
import java.util.UUID;

@Data
public class FileNoteDto implements Serializable {
    private final UUID id;
    private final Date created;
    private final Date lastModified;
    private final String fileAddress;
    private final String notes;
    private final Set<ARAssetDto> arAssets;
}
