package com.goNutsCoding.evolvedVision.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class MemberLoginDto implements Serializable {
    private final String username;
    private final String pass;
}
