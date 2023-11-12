package com.goNutsCoding.evolvedVision.dto;

import com.goNutsCoding.evolvedVision.entity.Role;
import lombok.Data;

import java.io.Serializable;

@Data
public class MemberRegistrationDto implements Serializable {
    private final Role role;
    private final String emailId;
    private final String username;
    private final String pass;
}
