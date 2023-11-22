package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.dto.MemberLoginDto;
import com.goNutsCoding.evolvedVision.dto.MemberRegistrationDto;
import com.goNutsCoding.evolvedVision.entity.Member;
import com.goNutsCoding.evolvedVision.entity.MemberStatus;
import com.goNutsCoding.evolvedVision.mapper.MemberMapper;
import com.goNutsCoding.evolvedVision.repository.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.sql.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class MemberService {

    @Value("${pass.salt}")
    private String salt;

    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private ARAssetService arAssetService;

    @Autowired
    private FileNoteService fileNoteService;

    @Autowired
    private AWSService awsService;

    public Optional<Member> getMemberById (UUID memberId) {
        return memberRepo.findById(memberId);
    }

    public MemberDto validateMember(MemberLoginDto memberLoginDto)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        Member member = memberRepo.findByEmailIdOrUsername(
                memberLoginDto.getUsername()
        );

        if (ObjectUtils.isEmpty(member)) return null;

        if (!member.getPassword().equals(
                getKeyFromPassword(memberLoginDto.getPass()).toString()))
            return null;

        Set<ARAssetDto> arAssetsByUserId = arAssetService.getARAssetsByMemberId(member.getId());

        return MemberMapper.mapMemberToMemberDto(
                member,
                arAssetsByUserId,
                fileNoteService.getFileNotesByMemberId(member.getId(), arAssetsByUserId)
        );
    }

    /**
     * Save a new User with unique username and encrypted password.
     */
    public MemberDto saveMember(MemberRegistrationDto userRegistrationDto)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        Member newMember = new Member();
        newMember.setEmailId(userRegistrationDto.getEmailId());
        newMember.setUsername(userRegistrationDto.getUsername());
        newMember.setPassword(getKeyFromPassword(
                userRegistrationDto.getPass()
        ).toString());
        newMember.setRole(userRegistrationDto.getRole());
        newMember.setStatus(MemberStatus.ACTIVE);
        newMember.setCreated(new Date(System.currentTimeMillis()));
        newMember.setLastModified(new Date(System.currentTimeMillis()));

        Member savedMember = memberRepo.save(newMember);
        return MemberMapper.mapMemberToMemberDto(savedMember, new HashSet<>(), new HashSet<>());
    }

    /**
     * A method for generating the AES key from a given password
     * with 1001 iterations and a key length of 256 bits.
     * Reference: https://stackoverflow.com/questions/992019/java-256-bit-aes-password-based-encryption
     * Site: stackoverflow.com
     * Topic: Java 256-bit AES Password-Based Encryption
     */
    private SecretKey getKeyFromPassword(String password)
            throws NoSuchAlgorithmException, InvalidKeySpecException {

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 1001, 256);
        SecretKey secret = new SecretKeySpec(factory.generateSecret(spec)
                .getEncoded(), "AES");
        return secret;
    }

    /**
     * Get Member by Member Id.
     * */
    public MemberDto getMemberDataById(UUID userId) {
        Member member = memberRepo.getReferenceById(userId);

        if (ObjectUtils.isEmpty(member)) return null;

        Set<ARAssetDto> arAssetsByMemberId = arAssetService.getARAssetsByMemberId(member.getId());
        MemberDto memberDto = MemberMapper.mapMemberToMemberDto(
                member,
                arAssetsByMemberId,
                fileNoteService.getFileNotesByMemberId(member.getId(), arAssetsByMemberId)
        );
        return memberDto;
    }

    /**
     * Get File from S3
    * */
    public File getFileFromS3 (String fileAddress) {
        return awsService.getFileFromS3(fileAddress);
    }
}
