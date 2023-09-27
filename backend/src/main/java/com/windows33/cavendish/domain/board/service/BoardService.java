package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import com.windows33.cavendish.domain.board.dto.request.BoardModifyRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {

    Integer addArticle(BoardAddRequestDto boardAddRequestDto, List<MultipartFile> img, Integer id);

    void removeArticle(Integer boardId, Integer id);

    Integer modifyArticle(BoardModifyRequestDto boardModifyRequestDto, Integer id);

}
