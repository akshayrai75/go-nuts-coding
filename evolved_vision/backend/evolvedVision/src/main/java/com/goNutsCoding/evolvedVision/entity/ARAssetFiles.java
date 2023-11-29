package com.goNutsCoding.evolvedVision.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ARAssetFiles implements Serializable {
    @Serial
    private final static long serialVersionUID = 25112023L;

    private String[] images;
    private String[] videos;
    private String orgTargetImage;
    private boolean customTemplate;
}
