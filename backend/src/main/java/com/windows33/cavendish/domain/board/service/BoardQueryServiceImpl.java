package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
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
    public Page<BoardListResponseDto> findBoardList(Pageable pageable) {
        return boardQueryRepository.findBoardList(pageable);
    }

}
