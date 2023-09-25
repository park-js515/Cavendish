package com.windows33.cavendish.domain.board.repository;

import com.windows33.cavendish.domain.board.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
}
