package com.windows33.cavendish.domain.board.controller;

import com.sun.security.auth.UserPrincipal;
import com.windows33.cavendish.domain.member.dto.request.MemberLoginRequestDto;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Operation(summary = "게시글 작성", description = "게시글 작성")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "게시글 정보"),
            @Parameter(name = "multipartFiles", description = "이미지")
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public CommonResponse<Void> addArticle(
            @RequestPart(value = "data") MemberLoginRequestDto memberLoginRequestDto,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {

        return CommonResponse.OK(null);
    }

}
