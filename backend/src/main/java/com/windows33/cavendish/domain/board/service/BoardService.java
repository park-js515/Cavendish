package com.windows33.cavendish.domain.board.service;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {

    void addArticle(BoardAddRequestDto boardAddRequestDto, List<MultipartFile> img, Integer id);

    void removeArticle(Integer boardId, Integer id);

}
