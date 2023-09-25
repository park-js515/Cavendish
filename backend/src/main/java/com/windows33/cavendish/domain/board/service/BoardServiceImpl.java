package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import com.windows33.cavendish.domain.board.entity.Board;
import com.windows33.cavendish.domain.board.entity.BoardImage;
import com.windows33.cavendish.domain.board.repository.BoardImageRepository;
import com.windows33.cavendish.domain.board.repository.BoardRepository;
import com.windows33.cavendish.domain.member.entity.Member;
import com.windows33.cavendish.domain.member.repository.MemberRepository;
import com.windows33.cavendish.global.util.LocalFileUtil;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageRepository boardImageRepository;
    private final LocalFileUtil localFileUtil;

    @Override
    public void addArticle(BoardAddRequestDto boardAddRequestDto, List<MultipartFile> img, int id) {
        log.info("addArticle 진입");

        Board.BoardBuilder board = Board.builder()
                .userId(id)
                .title(boardAddRequestDto.getTitle())
                .contents(boardAddRequestDto.getContents())
                .quotationId(boardAddRequestDto.getQuotationId());

        boardRepository.save(board.build());

//        List<String> images = localFileUtil.uploadFiles("BoardImage", img);
//
//        // 이미지 테이블 저장
//        for(String image : images) {
//            boardImageRepository.save(
//                    BoardImage.builder()
//                            .boardId(id)
//                            .imagePath(image)
//                            .build()
//            );
//        }
    }

}

