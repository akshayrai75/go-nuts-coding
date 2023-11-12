package com.goNutsCoding.evolvedVision.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(unique = true)
    private String emailId;

    @Column(unique = true)
    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    @OneToMany(mappedBy= "member")
    private Set<ARAsset> arAssets;

    @OneToMany(mappedBy= "member")
    private Set<FileNote> fileNotes;
}
