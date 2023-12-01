package com.goNutsCoding.evolvedVision.controller;

import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.dto.MemberLoginDto;
import com.goNutsCoding.evolvedVision.dto.MemberRegistrationDto;
import com.goNutsCoding.evolvedVision.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = "*")
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

    @PostMapping("/login")
    public ResponseEntity<MemberDto> validateMemberLogin(@Validated @RequestBody MemberLoginDto member) {
        try {
            MemberDto memberDto = memberService.validateMember(member);
            if (memberDto != null) {
                return ResponseEntity.ok().body(memberDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDto> getUserData(@PathVariable(value = "id") UUID userId) {
        try {
            MemberDto member = memberService.getMemberDataById(userId);
            if (member != null) {
                return ResponseEntity.ok().body(member);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * API to enable downloading saved Files from S3
     * Reference:
     * https://www.baeldung.com/spring-controller-return-image-file#rawdata
     * Site: baeldung.com/
     * Topic: Download an Image or a File with Spring MVC : Using produces for
     * Returning Raw Data
     */
    @GetMapping(value = "/download_file", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public Resource downloadS3File(@RequestParam String fileAddress) throws IOException {
        File fileFromS3 = memberService.getFileFromS3(fileAddress);
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(fileFromS3.toPath()));
        return resource;
    }
}
