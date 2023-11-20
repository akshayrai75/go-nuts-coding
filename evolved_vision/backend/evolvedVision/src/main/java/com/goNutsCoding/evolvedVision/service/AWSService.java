package com.goNutsCoding.evolvedVision.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;

import java.io.File;

@Service
public class AWSService {
    @Autowired
    private AWSClient amazonClient;

    public String uploadFile(MultipartFile file, String userId) {
        return amazonClient.uploadFile(file, userId);
    }

    public DeleteObjectResponse deleteFile(String fileUrl) {
        return amazonClient.deleteFileFromS3Bucket(fileUrl);
    }

    public File getFileFromS3 (String fileAddress) {
        return amazonClient.getFileFromS3(fileAddress);
    }
}
