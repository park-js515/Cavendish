package com.windows33.cavendish.domain.board.repository;

import com.windows33.cavendish.domain.board.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {

    Optional<BoardImage> findById(Integer id);

    Optional<List<BoardImage>> findByBoardId(Integer id);

    Optional<Void> deleteByIdIn(List<Integer> ids);

}
