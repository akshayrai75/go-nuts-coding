package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "content")
@Getter
@Setter
public class ARContent extends BaseEntity {

    @Column(length = 100)
    private String contentHeader;

    @Column(length = 1000)
    private String contentBody;

    @OneToOne(mappedBy = "arContent")
    private ARAsset arAsset;
}
