package com.windows33.cavendish.domain.quotation.controller;

import com.windows33.cavendish.domain.quotation.dto.request.QuotationAddRequestDto;
import com.windows33.cavendish.domain.quotation.dto.response.QuotationDetailResponseDto;
import com.windows33.cavendish.domain.quotation.dto.response.QuotationListResponseDto;
import com.windows33.cavendish.domain.quotation.service.QuotationQueryService;
import com.windows33.cavendish.domain.quotation.service.QuotationService;
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

@Tag(name = "Quotation", description = "견적 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotation")
public class QuotationController {

    private final QuotationService quotationService;
    private final QuotationQueryService quotationQueryService;

    @Operation(summary = "견적 작성", description = "견적 작성")
    @Parameters({
            @Parameter(name = "quotationAddRequestDto", description = "견적 내용")
    })
    @PostMapping
    public CommonResponse<Integer> quotationAdd(
            @RequestBody QuotationAddRequestDto quotationAddRequestDto,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(quotationService.addQuotation(quotationAddRequestDto, userPrincipal.getId()));
    }
    
    @Operation(summary = "견적 목록 조회", description = "견적 목록 조회")
    @Parameters({
            @Parameter(name = "pageable", description = "페이지 정보")
    })
    @GetMapping
    public CommonResponse<Page<QuotationListResponseDto>> quotationList(
            @PageableDefault(sort="createDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return CommonResponse.OK(quotationQueryService.findQuotationList(pageable, userPrincipal.getId()));
    }

    @Operation(summary = "견적 상세 조회", description = "견적 상세 조회")
    @Parameters({
            @Parameter()
    })
    @GetMapping("/detail/{quotationId}")
    public CommonResponse<QuotationDetailResponseDto> quotationDetail(
            @PathVariable("quotationId") Integer quotationId
    ) {
        return CommonResponse.OK(quotationQueryService.findQuotationDetail(quotationId));
    }

}