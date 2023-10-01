package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import com.windows33.cavendish.domain.board.dto.request.BoardModifyRequestDto;
import com.windows33.cavendish.domain.board.entity.Board;
import com.windows33.cavendish.domain.board.entity.BoardImage;
import com.windows33.cavendish.domain.board.repository.BoardImageRepository;
import com.windows33.cavendish.domain.board.repository.BoardRepository;
import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.util.FileStoreUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageRepository boardImageRepository;
    private final FileStoreUtil fileStoreUtil;

    @Override
    public Integer addArticle(BoardAddRequestDto boardAddRequestDto, List<MultipartFile> img, Integer id) {
        Board.BoardBuilder board = Board.builder()
                .userId(id)
                .title(boardAddRequestDto.getTitle())
                .contents(boardAddRequestDto.getContents())
                .quotationId(boardAddRequestDto.getQuotationId());

        Integer boardId = boardRepository.save(board.build()).getId();

        // 이미지 파일 저장
        List<String> images = fileStoreUtil.uploadFiles("BoardImage", img);

        // 이미지 테이블 저장
        for(String image : images) {
            boardImageRepository.save(
                    BoardImage.builder()
                            .boardId(boardId)
                            .imagePath(image)
                            .build()
            );
        }

        return boardId;
    }

    @Override
    public void removeArticle(Integer boardId, Integer id) {
        Board board = checkAuthority(boardId, id);
        
        // 글 삭제
        boardRepository.delete(board);

        // 이미지 조회
        List<BoardImage> images = boardImageRepository.findByBoardId(boardId).orElseThrow(() -> new NotFoundException(BoardImage.class, boardId));

        // 이미지 파일 제거
        List<Integer> ids = fileStoreUtil.deleteFiles(images);
        
        // 이미지 테이블 제거
        boardImageRepository.deleteByIdIn(ids);
    }

    @Override
    public Integer modifyArticle(BoardModifyRequestDto boardModifyRequestDto, List<MultipartFile> img, Integer userId) {
        List<BoardImage> deleteBoardImages = new ArrayList<>();

        Board board = checkAuthority(boardModifyRequestDto.getId(), userId);

        if (!board.getUserId().equals(userId)) {
            throw new InvalidException(Board.class, userId);
        }

        board.updateBoard(
                boardModifyRequestDto.getQuotationId(),
                boardModifyRequestDto.getTitle(),
                boardModifyRequestDto.getContents()
        );

        // 글 수정
        Integer boardId = boardRepository.save(board).getId();

        // 이미지 파일 저장
        List<String> images = fileStoreUtil.uploadFiles("BoardImage", img);

        // 이미지 테이블 저장
        for (String image : images) {
            boardImageRepository.save(
                    BoardImage.builder()
                            .boardId(boardId)
                            .imagePath(image)
                            .build()
            );
        }

        // 삭제할 이미지 리스트 저장
        for (Integer imageId : boardModifyRequestDto.getDeleteImage()) {
            deleteBoardImages.add(boardImageRepository.findById(imageId).orElseThrow(() -> new NotFoundException(BoardImage.class, imageId)));
        }

        // 이미지 파일 제거
        List<Integer> ids = fileStoreUtil.deleteFiles(deleteBoardImages);

        // 이미지 테이블 제거
        if(!ids.isEmpty()) boardImageRepository.deleteByIdIn(ids);

        return boardModifyRequestDto.getId();
    }

    private Board checkAuthority(Integer boardId, Integer id) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NotFoundException(Board.class, boardId));

        if(!board.getUserId().equals(id)) {
            throw new InvalidException(Board.class, boardId);
        }

        return board;
    }

}

