package com.windows33.cavendish.domain.board.repository;

import com.windows33.cavendish.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
