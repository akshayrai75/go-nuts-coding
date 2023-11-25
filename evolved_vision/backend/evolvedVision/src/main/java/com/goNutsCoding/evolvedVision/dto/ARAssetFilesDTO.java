package com.goNutsCoding.evolvedVision.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonRootName("arAssets")
@AllArgsConstructor
@NoArgsConstructor
public class ARAssetFilesDTO {
    private String[] images;
    private String[] videos;
}
