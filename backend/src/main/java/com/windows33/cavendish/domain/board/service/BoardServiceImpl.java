package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import com.windows33.cavendish.domain.board.entity.Board;
import com.windows33.cavendish.domain.board.entity.BoardImage;
import com.windows33.cavendish.domain.board.repository.BoardImageRepository;
import com.windows33.cavendish.domain.board.repository.BoardRepository;
import com.windows33.cavendish.domain.member.entity.Member;
import com.windows33.cavendish.domain.member.repository.MemberRepository;
import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.util.LocalFileUtil;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageRepository boardImageRepository;
    private final LocalFileUtil localFileUtil;

    @Override
    public void addArticle(BoardAddRequestDto boardAddRequestDto, List<MultipartFile> img, Integer id) {
        Board.BoardBuilder board = Board.builder()
                .userId(id)
                .title(boardAddRequestDto.getTitle())
                .contents(boardAddRequestDto.getContents())
                .quotationId(boardAddRequestDto.getQuotationId());

        int boardId = boardRepository.save(board.build()).getId();

        List<String> images = localFileUtil.uploadFiles("BoardImage", img);

        // 이미지 테이블 저장
        for(String image : images) {
            boardImageRepository.save(
                    BoardImage.builder()
                            .boardId(boardId)
                            .imagePath(image)
                            .build()
            );
        }
    }

    @Override
    public void removeArticle(Integer boardId, Integer id) {
        Board board = checkAuthority(boardId, id);

        // 이미지 조회
        List<BoardImage> images = boardImageRepository.findByBoardId(boardId).orElseThrow(() -> new NotFoundException(BoardImage.class, boardId));

        // 이미지 제거
        List<Integer> ids = localFileUtil.deleteFiles(images);
        boardImageRepository.deleteByIdIn(ids);
    }

    private Board checkAuthority(Integer boardId, Integer id) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NotFoundException(Board.class, boardId));

        if(!board.getUserId().equals(id)) {
            throw new InvalidException(Board.class, boardId);
        }

        return board;
    }

}

