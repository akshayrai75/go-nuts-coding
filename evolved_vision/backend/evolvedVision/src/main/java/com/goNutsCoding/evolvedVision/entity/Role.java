package com.goNutsCoding.evolvedVision.entity;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN ("ADMIN"), MEMBER ("MEMBER");

    String role;
    Role(String role) {
        this.role = role;
    }
}
