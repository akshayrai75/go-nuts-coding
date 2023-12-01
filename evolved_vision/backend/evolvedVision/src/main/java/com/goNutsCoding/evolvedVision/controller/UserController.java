package com.goNutsCoding.evolvedVision.controller;

import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/member/user")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<MemberDto> getUserData(@PathVariable(value = "id") UUID userId) {
        try {
            MemberDto member = userService.getMemberDataById(userId);
            if (member != null) {
                return ResponseEntity.ok().body(member);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
