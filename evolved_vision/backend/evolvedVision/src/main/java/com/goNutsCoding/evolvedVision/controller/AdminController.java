package com.goNutsCoding.evolvedVision.controller;

import com.goNutsCoding.evolvedVision.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/member/admin")
@Validated
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add-new-content")
    @CrossOrigin
    public ResponseEntity<String> addNewContent(@RequestParam("pdfFile") MultipartFile pdfFile,
                                                @RequestParam("arModelFile") MultipartFile arModelFile,
                                                @RequestParam("targetImageFile") MultipartFile targetImageFile,
                                                @RequestParam String title,
                                                @RequestParam String description,
                                                @RequestParam String userId) {

        return adminService.addNewContent(pdfFile, arModelFile, targetImageFile, title, description, userId);
    }


}
