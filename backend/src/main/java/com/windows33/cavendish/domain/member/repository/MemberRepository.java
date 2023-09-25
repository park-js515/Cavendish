package com.windows33.cavendish.domain.member.repository;

import com.windows33.cavendish.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(int id);

    Optional<Member> findByLoginId(String loginId);

}