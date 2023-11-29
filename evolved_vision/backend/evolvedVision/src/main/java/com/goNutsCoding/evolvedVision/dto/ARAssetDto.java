package com.goNutsCoding.evolvedVision.dto;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.util.UUID;

@Data
public class ARAssetDto implements Serializable {
    private final UUID id;
    private final Date created;
    private final Date lastModified;
    private final String modelAddress;
    private final ARContentDto arContent;
    private final TargetImageDto targetImage;
    private final Boolean takeNotes;
    private final UUID fileNoteId;
}
