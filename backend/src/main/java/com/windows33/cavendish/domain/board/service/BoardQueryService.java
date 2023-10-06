package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.response.BoardDetailResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardModifyFormResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardQueryService {

    Page<BoardListResponseDto> findBoardList(Pageable pageable, String type, Integer userId);

    BoardDetailResponseDto findBoardDetail(Integer boardId, Integer userId);

    BoardModifyFormResponseDto findBoardUpdateForm(Integer boardId, Integer userId);

}