package com.windows33.cavendish.domain.quotation.service;

import com.windows33.cavendish.domain.quotation.dto.response.QuotationListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuotationQueryService {

    Page<QuotationListResponseDto> findQuotationList(Pageable pageable, Integer userId);

}
