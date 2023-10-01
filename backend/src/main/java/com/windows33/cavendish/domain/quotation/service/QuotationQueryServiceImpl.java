package com.windows33.cavendish.domain.quotation.service;

import com.windows33.cavendish.domain.quotation.dto.response.QuotationListResponseDto;
import com.windows33.cavendish.domain.quotation.repository.QuotationQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class QuotationQueryServiceImpl implements QuotationQueryService{

    private final QuotationQueryRepository quotationQueryRepository;

    @Override
    public Page<QuotationListResponseDto> findQuotationList(Pageable pageable, Integer userId) {
        return quotationQueryRepository.findQuotationList(pageable, userId);
    }

}
