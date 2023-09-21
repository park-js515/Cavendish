package com.windows33.cavendish.domain.board.controller;

import com.windows33.cavendish.domain.member.dto.request.MemberLoginRequestDto;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Board", description = "게시판 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    @Operation(summary = "게시글 작성", description = "게시글 작성")
    @Parameters({
            @Parameter(name = "memberLoginRequestDto", description = "게시글 정보")
    })
    @PostMapping("/add")
    public CommonResponse<Void> login(
            @RequestBody MemberLoginRequestDto memberLoginRequestDto
    ) {

        return CommonResponse.OK(null);
    }

}
