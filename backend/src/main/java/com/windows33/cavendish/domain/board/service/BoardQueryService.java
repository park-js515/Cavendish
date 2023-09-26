package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardQueryService {

    Page<BoardListResponseDto> findBoardList(Pageable pageable);

}
