package com.windows33.cavendish.domain.quotation.service;

import com.windows33.cavendish.domain.quotation.dto.request.QuotationAddRequestDto;

public interface QuotationService {

    Integer addQuotation(QuotationAddRequestDto quotationAddRequestDto, Integer userId);

    void removeQuotation(Integer quotationId, Integer userId);

}
