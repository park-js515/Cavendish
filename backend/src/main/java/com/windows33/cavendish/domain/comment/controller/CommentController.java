package com.windows33.cavendish.domain.comment.controller;

import com.windows33.cavendish.domain.comment.dto.request.CommentAddRequestDto;
import com.windows33.cavendish.domain.comment.dto.request.CommentModifyRequestDto;
import com.windows33.cavendish.domain.comment.dto.response.CommentListResponseDto;
import com.windows33.cavendish.domain.comment.service.CommentQueryService;
import com.windows33.cavendish.domain.comment.service.CommentService;
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

@Tag(name = "Comment", description = "댓글 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;
    private final CommentQueryService commentQueryService;

    @Operation(summary = "댓글 작성", description = "댓글 작성")
    @Parameters({
            @Parameter(name = "CommentAddRequestDto", description = "댓글 내용"),
            @Parameter(name = "type", description = "검색 타입")
    })
    @PostMapping
    public CommonResponse<Integer> commentAdd(
            @RequestBody CommentAddRequestDto commentAddRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(commentService.addComment(commentAddRequestDto, userPrincipal.getId()));
    }

    @Operation(summary = "댓글 목록 조회", description = "댓글 목록 조회")
    @Parameters({
            @Parameter(name = "pageable", description = "페이지 정보"),
    })
    @GetMapping("/{boardId}")
    public CommonResponse<Page<CommentListResponseDto>> commentList(
            @PageableDefault(sort="createDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @PathVariable("boardId") Integer boardId,
            @RequestParam(required = false) String type,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(commentQueryService.findCommentList(boardId, pageable, type, userPrincipal!=null?userPrincipal.getId():null));
    }

    @Operation(summary = "댓글 삭제", description = "댓글 삭제")
    @Parameters({
            @Parameter(name = "commentId", description = "댓글 ID")
    })
    @DeleteMapping("/delete/{commentId}")
    public CommonResponse<Void> commentRemove(
            @PathVariable("commentId") Integer commentId,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        commentService.removeComment(commentId, userPrincipal.getId());

        return CommonResponse.OK(null);
    }

    @Operation(summary = "댓글 수정", description = "댓글 수정")
    @Parameters({
            @Parameter(name = "commentModifyRequestDto", description = "수정 댓글 내용")
    })
    @PutMapping
    public CommonResponse<Integer> commentModify(
            @RequestBody CommentModifyRequestDto commentModifyRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(commentService.modifyComment(commentModifyRequestDto, userPrincipal.getId()));
    }

}