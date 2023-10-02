package com.windows33.cavendish.domain.part_bookmark.controller;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;
import com.windows33.cavendish.global.jwt.UserPrincipal;
import com.windows33.cavendish.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "PartBookmark", description = "부품 북마크 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/partBookmark")
public class PartBookmarkController {

    @Operation(summary = "부품 북마크 저장", description = "부품 북마크 저장")
    @Parameters({
            @Parameter(name = "partBookmarkAddRequestDto", description = "부품 북마크 정보")
    })
    @PostMapping
    public CommonResponse<Integer> partBookmarkAdd(
            @RequestBody PartBookmarkAddRequestDto partBookmarkAddRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(null);
    }

}
