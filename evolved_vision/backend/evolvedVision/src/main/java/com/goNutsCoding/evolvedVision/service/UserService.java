package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.FileNoteDto;
import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.entity.Member;
import com.goNutsCoding.evolvedVision.entity.Role;
import com.goNutsCoding.evolvedVision.mapper.MemberMapper;
import com.goNutsCoding.evolvedVision.repository.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private ARAssetService arAssetService;

    @Autowired
    private FileNoteService fileNoteService;

    public MemberDto getMemberDataById(UUID userId) {
        Optional<Member> member = memberRepo.findById(userId);
        MemberDto memberDto = null;
        if (member.isPresent()) {
            Member user = member.get();
            if (user.getRole().equals(Role.MEMBER)){
                Set<ARAssetDto> arAssetDtos = arAssetService.getAllARAssets();
                Set<FileNoteDto> fileNoteDtos = fileNoteService.getAllFileNotes(arAssetDtos);

                memberDto = MemberMapper.mapMemberToMemberDto(member.get(), arAssetDtos, fileNoteDtos);
            }
        }

        return memberDto;
    }
}
