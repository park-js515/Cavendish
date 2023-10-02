package com.windows33.cavendish.domain.part_bookmark.controller;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;
import com.windows33.cavendish.domain.part_bookmark.dto.response.PartBookmarkListDto;
import com.windows33.cavendish.domain.part_bookmark.service.PartBookmarkQueryService;
import com.windows33.cavendish.domain.part_bookmark.service.PartBookmarkService;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "PartBookmark", description = "부품 북마크 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/part-bookmark")
public class PartBookmarkController {

    private final PartBookmarkService partBookmarkService;
    private final PartBookmarkQueryService partBookmarkQueryService;

    @Operation(summary = "부품 북마크 등록", description = "부품 북마크 등록")
    @Parameters({
            @Parameter(name = "partBookmarkAddRequestDto", description = "부품 북마크 정보")
    })
    @PostMapping
    public CommonResponse<Integer> partBookmarkAdd(
            @RequestBody PartBookmarkAddRequestDto partBookmarkAddRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(partBookmarkService.addPartBookmark(partBookmarkAddRequestDto, userPrincipal.getId()));
    }
    
    @Operation(summary = "부품 북마크 목록 조회", description = "부품 북마크 목록 조회")
    @Parameters({
            @Parameter(name = "pageable", description = "페이지 정보"),
            @Parameter(name = "partCategory", description = "부품 구분")
    })
    @GetMapping("/list")
    public CommonResponse<Page<PartBookmarkListDto>> partBookmarkList(
            @PageableDefault(sort="createDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam Integer partCategory,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(partBookmarkQueryService.findPartBookmarkList(pageable, partCategory, userPrincipal.getId()));
    }

}
