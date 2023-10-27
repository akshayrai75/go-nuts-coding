package com.goNutsCoding.evolvedVision.entity;

public enum MemberStatus {
    ACTIVE ("ACTIVE"), INACTIVE ("INACTIVE");

    String status;
    MemberStatus(String status) {
        this.status = status;
    }
}
