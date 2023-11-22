package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Set;

@Entity
@Table(name = "file_note")
@Getter
@Setter
public class FileNote extends BaseEntity{

    private String fileAddress;

    @Column(columnDefinition = "varchar(500)")
    private String notes;

    @ManyToOne
    @JoinColumn(name="member_id", nullable=false)
    private Member member;

    @OneToMany(mappedBy="fileNote")
    private Set<ARAsset> arAssets;
}
