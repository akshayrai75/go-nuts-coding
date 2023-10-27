package com.goNutsCoding.evolvedVision.controller;

import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.dto.MemberRegistrationDto;
import com.goNutsCoding.evolvedVision.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<MemberDto> registerNewMember(@Validated @RequestBody MemberRegistrationDto member) {
        try {
            MemberDto memberDto = memberService.saveMember(member);
            if (memberDto != null) {
                return ResponseEntity.ok().body(memberDto);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
