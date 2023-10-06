package com.windows33.cavendish.domain.board.repository;

import com.windows33.cavendish.domain.board.entity.BoardLike;
import com.windows33.cavendish.domain.board.entity.BoardLikeID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, BoardLikeID> {

    Optional<BoardLike> findById(BoardLikeID boardLikeID);

}
