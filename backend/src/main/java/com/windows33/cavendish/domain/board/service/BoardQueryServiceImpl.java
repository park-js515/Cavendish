package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.response.BoardDetailResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardModifyFormResponseDto;
import com.windows33.cavendish.domain.board.repository.BoardQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardQueryServiceImpl implements BoardQueryService {

    private final BoardQueryRepository boardQueryRepository;

    @Override
    public Page<BoardListResponseDto> findBoardList(Pageable pageable, String type, Integer userId) {
        return boardQueryRepository.findBoardList(pageable, type, userId);
    }

    @Override
    public BoardDetailResponseDto findBoardDetail(Integer boardId, Integer userId) {
        return boardQueryRepository.findBoardDetail(boardId, userId);
    }

    @Override
    public BoardModifyFormResponseDto findBoardUpdateForm(Integer boardId, Integer userId) {
        return boardQueryRepository.findBoardUpdateForm(boardId, userId);
    }

}
