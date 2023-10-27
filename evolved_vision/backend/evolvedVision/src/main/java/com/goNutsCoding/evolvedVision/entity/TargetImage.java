package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "target_image")
@Getter
@Setter
public class TargetImage extends BaseEntity{

    private String imageAddress;

    private Boolean isPublic;

    @OneToOne(mappedBy = "targetImage")
    private ARAsset arAsset;
}
