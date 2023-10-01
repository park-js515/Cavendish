package com.windows33.cavendish.domain.quotation.service;

import com.windows33.cavendish.domain.quotation.dto.request.QuotationAddRequestDto;
import com.windows33.cavendish.domain.quotation.dto.request.QuotationModifyRequestDto;
import com.windows33.cavendish.domain.quotation.entity.Quotation;

public interface QuotationService {

    Integer addQuotation(QuotationAddRequestDto quotationAddRequestDto, Integer userId);

    void removeQuotation(Integer quotationId, Integer userId);

    Integer modifyQuotation(QuotationModifyRequestDto quotationModifyRequestDto, Integer userId);

}
