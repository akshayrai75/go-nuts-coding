package com.goNutsCoding.evolvedVision.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goNutsCoding.evolvedVision.dto.ARAssetFilesDTO;
import com.goNutsCoding.evolvedVision.service.AWSService;
import com.goNutsCoding.evolvedVision.service.AdminService;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/member/admin")
@Validated
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AWSService awsService;

    @Autowired
    private AdminService adminService;

    @PostMapping(value = "/add-new-content", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<String> addNewContent(@RequestPart("pdfFile") MultipartFile pdfFile,
                                                @RequestParam String model,
                                                @RequestParam String targetImage,
                                                @RequestParam String title,
                                                @RequestParam String description,
                                                @RequestParam String arAssets,
                                                @RequestParam String userId) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        ARAssetFilesDTO arAssetsDto = mapper.readValue(arAssets, ARAssetFilesDTO.class);

        return adminService.addNewContent(pdfFile, model, targetImage, title, description, arAssetsDto, userId);
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
