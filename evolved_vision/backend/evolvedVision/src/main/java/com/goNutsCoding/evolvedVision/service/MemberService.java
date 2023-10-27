package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.MemberDto;
import com.goNutsCoding.evolvedVision.dto.MemberRegistrationDto;
import com.goNutsCoding.evolvedVision.entity.Member;
import com.goNutsCoding.evolvedVision.mapper.MemberMapper;
import com.goNutsCoding.evolvedVision.repository.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.UUID;

@Service
public class MemberService {

    @Autowired
    private MemberRepo memberRepo;

    /**
     * Save a new User with unique username and encrypted password.
     */
    public MemberDto saveMember(MemberRegistrationDto userRegistrationDto) {
        UUID userId = UUID.randomUUID();
        Member newMember = new Member();
        newMember.setId(userId);
        newMember.setEmailId(userRegistrationDto.getEmailId());
        newMember.setUsername(userRegistrationDto.getUsername());
        newMember.setPassword(userRegistrationDto.getPass());

        Member savedMember = memberRepo.save(newMember);
        return MemberMapper.mapMemberToMemberDto(savedMember, new HashSet<>(), new HashSet<>());
    }
}
