package com.goNutsCoding.evolvedVision.repository;

import com.goNutsCoding.evolvedVision.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MemberRepo extends JpaRepository<Member, UUID> {

    @Query(value = "SELECT * FROM Member m WHERE m.email_id = ?1 " +
            "OR m.username = ?1", nativeQuery = true)
    Member findByEmailIdOrUsername (String username);

}
