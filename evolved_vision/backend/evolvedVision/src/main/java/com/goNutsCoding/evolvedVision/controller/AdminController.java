package com.goNutsCoding.evolvedVision.controller;

import com.goNutsCoding.evolvedVision.service.AWSService;
import com.goNutsCoding.evolvedVision.service.AdminService;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/member/admin")
@Validated
public class AdminController {

    @Autowired
    private AWSService awsService;

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

    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<HashMap<String, String>> addNewContent(@RequestParam("file") MultipartFile file,
            @RequestParam String userId) {
        try {
            String url = awsService.uploadFile(file, userId);
            HashMap<String, String> response = new HashMap<>();
            response.put("url", url);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            HashMap<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
