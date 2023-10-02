package com.windows33.cavendish.domain.part_bookmark.repository;

import com.windows33.cavendish.domain.part_bookmark.entity.PartBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartBookmarkRepository extends JpaRepository<PartBookmark, Long> {

    Optional<PartBookmark> findById(Integer id);

}
