package com.windows33.cavendish.domain.quotation.controller;

import com.windows33.cavendish.domain.quotation.dto.request.QuotationAddRequestDto;
import com.windows33.cavendish.domain.quotation.service.QuotationService;
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

@Tag(name = "Quotation", description = "견적 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotation")
public class QuotationController {

    private final QuotationService quotationService;

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

}