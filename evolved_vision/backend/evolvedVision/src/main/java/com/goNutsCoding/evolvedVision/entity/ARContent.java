package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ar_asset_files", columnDefinition = "jsonb")
    private ARAssetFiles arAssetFiles;
}
