package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ar_content")
@Getter
@Setter
public class ARAsset extends BaseEntity{

    @ManyToOne
    @JoinColumn(name="member_id", nullable=false)
    private Member member;

    private String modelAddress;

    @ManyToOne
    @JoinColumn(name="file_note_id", nullable=false)
    private FileNote fileNote;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ar_content_id", referencedColumnName = "id")
    private ARContent arContent;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "target_image_id", referencedColumnName = "id")
    private TargetImage targetImage;

    private Boolean takeNotes;
}
