package com.goNutsCoding.evolvedVision.dto;

import com.goNutsCoding.evolvedVision.entity.ARAssetFiles;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.util.UUID;

@Data
public class ARContentDto implements Serializable {
    private final UUID id;
    private final Date created;
    private final Date lastModified;
    private final String contentHeader;
    private final String contentBody;
    private final ARAssetFiles arAssetFiles;
    private final UUID arAssetId;
}
