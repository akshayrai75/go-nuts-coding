package com.goNutsCoding.evolvedVision.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.*;
import java.util.Date;

/**
 * This class is for enabling saving files obtained from UI like ARContent
 * model, PDF File and Target image on AWS S3
 * Referenced from :
 * https://medium.com/oril/uploading-files-to-aws-s3-bucket-using-spring-boot-483fcb6f8646
 * Site: medium.com
 * Topic: Uploading files to AWS S3 Bucket using Spring Boot
 */
@Service
public class AWSClient {

    private S3Client s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
    @Value("${amazonProperties.region}")
    private String region;

    /**
     * One of the latest way of developing S3 client.
     * Reference:
     * https://stackoverflow.com/questions/68005239/how-do-you-configure-the-endpoint-for-amazon-s3-by-using-the-aws-sdk-v2
     * Site: stackoverflow.com
     * Topic: How do you configure the endpoint for Amazon S3 by using the AWS SDK
     * V2?
     */
    @PostConstruct
    private void initializeAmazon() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        s3client = S3Client.builder().region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials)).build();
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart, String userId) {
        return userId + "_" +
                new Date().getTime() +
                "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    /**
     * Uploading file to S3
     * Reference:
     * https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_PutObject_section.html
     * Site: docs.aws.amazon.com
     * Topic: Upload an object to an Amazon S3 bucket using an AWS SDK
     */
    private PutObjectResponse uploadFileTos3bucket(String fileName, File file) {
        return s3client.putObject(
                PutObjectRequest.builder().bucket(bucketName).key(fileName).acl(ObjectCannedACL.PUBLIC_READ).build(),
                RequestBody.fromFile(file));
    }

    public String uploadFile(MultipartFile multipartFile, String userId) {

        String fileUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile, userId);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            uploadFileTos3bucket(fileName, file);
            file.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileUrl;
    }

    public DeleteObjectResponse deleteFileFromS3Bucket(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        return s3client.deleteObject(DeleteObjectRequest.builder().bucket(bucketName).key(fileName).build());
    }

    /**
     * This class is for retrieving files like ARContent model, PDF File and Target
     * image from AWS S3
     * Referenced from :
     * https://www.baeldung.com/java-aws-s3#3-downloading-an-object
     * 2nd Ref:
     * https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_GetObject_section.html
     * Site: baeldung.com && docs.aws.amazon.com
     * Topic: AWS S3 with Java: 6.3 Downloading an Object && Get an object from an
     * Amazon S3 bucket using an AWS SDK
     */
    public File getFileFromS3(String s3ObjectAddress) {
        String inputFilename = s3ObjectAddress.substring(s3ObjectAddress.lastIndexOf("/") + 1);
        String outputFilename = inputFilename.substring(inputFilename.indexOf("-") + 1);
        File file = new File(outputFilename);

        GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName).key(inputFilename).build();

        try {
            ResponseBytes<GetObjectResponse> s3Response = s3client.getObjectAsBytes(getObjectRequest);
            byte[] fileData = s3Response.asByteArray();
            OutputStream outputStream = new FileOutputStream(file);
            outputStream.write(fileData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return file;
    }
}
