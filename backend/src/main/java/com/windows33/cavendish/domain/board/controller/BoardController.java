package com.windows33.cavendish.domain.board.controller;

import com.windows33.cavendish.domain.board.dto.request.BoardAddRequestDto;
import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import com.windows33.cavendish.domain.board.service.BoardQueryService;
import com.windows33.cavendish.domain.board.service.BoardService;
import com.windows33.cavendish.global.jwt.UserPrincipal;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Board", description = "게시판 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;
    private final BoardQueryService boardQueryService;

    @Operation(summary = "게시글 작성", description = "게시글 작성")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "게시글 정보"),
            @Parameter(name = "multipartFiles", description = "이미지")
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public CommonResponse<Void> addArticle(
            @RequestPart(value = "data") BoardAddRequestDto boardAddRequestDto,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        boardService.addArticle(boardAddRequestDto, multipartFiles, userPrincipal.getId());

        return CommonResponse.OK(null);
    }

    @Operation(summary = "글 목록 조회", description = "글 목록 조회")
    @Parameters({
            @Parameter(name = "pageable", description = "페이지 정보")
    })
    @GetMapping
    public CommonResponse<Page<BoardListResponseDto>> findAllArticle(
            @PageableDefault(sort="modifyDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(boardQueryService.findBoardList(pageable, userPrincipal.getId()));
    }

}
