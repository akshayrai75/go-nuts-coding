package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetFilesDTO;
import com.goNutsCoding.evolvedVision.entity.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private AWSService awsService;

    @Autowired
    private ARContentService arContentService;

    @Autowired
    private ARAssetService arAssetService;

    @Autowired
    private FileNoteService fileNoteService;

    @Autowired
    private TargetImageService targetImageService;

    @Autowired
    private MemberService memberService;

    public ResponseEntity<String> addNewContent(MultipartFile pdfFile, String model,
            String targetImage, String title,
            String description, ARAssetFilesDTO arAssets, String userId) {

        try {
            String pdfContent = extractContent(pdfFile);
            System.out.println("GOT PDF CONTENT");
            String pdfSummary = "";

            if (!"Error parsing PDF".equals(pdfContent)) {
                pdfSummary = openAIService.getSummary(pdfContent);
                System.out.println("GOT PDF SUMMARY FROM OPEN AI");
            }
            String pdfOns3 = awsService.uploadFile(pdfFile, userId);

            // Saving content in relevant tables.
            Optional<Member> member = memberService.getMemberById(UUID.fromString(userId));
            Member user = member.orElse(null);
            ARContent arContent = saveARContent(title, description, arAssets);
            FileNote fileNote = saveFileNotes(pdfOns3, pdfSummary, user);
            TargetImage targetImageObj = saveTargetImage(targetImage);

            saveARAsset(user, model, fileNote, arContent, targetImageObj);
            System.out.println("SAVED AR CONTENT");

            return ResponseEntity.ok("Content created successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Extract text content from uploaded PDFs. But it only works if PDF has been
     * converted from other document types
     * properly. That means if you open the PDF, the texts that could be selected
     * can only be extracted.
     * Referenced from :
     * https://medium.com/@georgeberar/springboot-extract-text-from-pdf-1d8d41b5adac
     * Site: medium.com
     * Topic: Uploading files to AWS S3 Bucket using Spring Boot
     */
    private String extractContent(final MultipartFile multipartFile) {
        String text;

        try (final PDDocument document = PDDocument.load(multipartFile.getInputStream())) {
            final PDFTextStripper pdfStripper = new PDFTextStripper();
            text = pdfStripper.getText(document);
        } catch (final Exception ex) {
            // log.error("Error parsing PDF", ex);
            text = "Error parsing PDF";
        }

        return text;
    }

    private ARContent saveARContent(String heading, String body, ARAssetFilesDTO arAssets) {
        ARAssetFiles arAssetFiles = new ARAssetFiles(arAssets.getImages(), arAssets.getVideos(),
                arAssets.getOrgTargetImage(), arAssets.isCustomTemplate());

        ARContent arContent = new ARContent();
        arContent.setContentBody(body);
        arContent.setContentHeader(heading);
        arContent.setCreated(new Date(System.currentTimeMillis()));
        arContent.setLastModified(new Date(System.currentTimeMillis()));
        arContent.setArAssetFiles(arAssetFiles);
        return arContentService.saveARContent(arContent);
    }

    private FileNote saveFileNotes(String fileAddress, String notes, Member user) {
        FileNote fileNote = new FileNote();
        fileNote.setFileAddress(fileAddress);
        fileNote.setNotes(notes);
        fileNote.setMember(user);
        fileNote.setCreated(new Date(System.currentTimeMillis()));
        fileNote.setLastModified(new Date(System.currentTimeMillis()));
        return fileNoteService.saveFileNote(fileNote);
    }

    private TargetImage saveTargetImage(String imageAddress) {
        TargetImage targetImage = new TargetImage();
        targetImage.setImageAddress(imageAddress);
        targetImage.setIsPublic(Boolean.FALSE);
        targetImage.setCreated(new Date(System.currentTimeMillis()));
        targetImage.setLastModified(new Date(System.currentTimeMillis()));

        return targetImageService.saveTargetImage(targetImage);
    }

    private ARAsset saveARAsset(Member user, String modelAddress, FileNote fileNote, ARContent arContent,
            TargetImage targetImage) {
        ARAsset arAsset = new ARAsset();
        arAsset.setMember(user);
        arAsset.setArContent(arContent);
        arAsset.setFileNote(fileNote);
        arAsset.setArOverlay(modelAddress);
        arAsset.setTargetImage(targetImage);
        arAsset.setTakeNotes(Boolean.FALSE);
        arAsset.setCreated(new Date(System.currentTimeMillis()));
        arAsset.setLastModified(new Date(System.currentTimeMillis()));

        return arAssetService.saveARAsset(arAsset);
    }
}
