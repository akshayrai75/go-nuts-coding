package com.goNutsCoding.evolvedVision.mapper;

import com.goNutsCoding.evolvedVision.dto.ARAssetDto;
import com.goNutsCoding.evolvedVision.dto.FileNoteDto;
import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.entity.Member;

import java.util.Set;

public class MemberMapper {
    public static MemberDto mapMemberToMemberDto(Member member, Set<ARAssetDto> arAssetsByMemberId,
                                           Set<FileNoteDto> fileNotesByMemberId) {
        return new MemberDto(
                member.getId(),
                member.getCreated(),
                member.getLastModified(),
                member.getRole(),
                member.getUsername(),
                member.getStatus(),
                arAssetsByMemberId,
                fileNotesByMemberId
        );
    }
}
