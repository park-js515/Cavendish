package com.windows33.cavendish.domain.quotation.service;

import com.windows33.cavendish.domain.quotation.dto.request.QuotationAddRequestDto;
import com.windows33.cavendish.domain.quotation.dto.request.QuotationModifyRequestDto;
import com.windows33.cavendish.domain.quotation.entity.Quotation;
import com.windows33.cavendish.domain.quotation.repository.QuotationRepository;
import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class QuotationServiceImpl implements QuotationService {

    private final QuotationRepository quotationRepository;

    @Override
    public Integer addQuotation(QuotationAddRequestDto quotationAddRequestDto, Integer userId) {
        Quotation quotation = Quotation.builder()
                .userId(userId)
                .cpuId(quotationAddRequestDto.getCpuId())
                .powerId(quotationAddRequestDto.getPowerId())
                .mainboardId(quotationAddRequestDto.getMainboardId())
                .ramId(quotationAddRequestDto.getRamId())
                .gpuId(quotationAddRequestDto.getGraphicId())
                .hddId(quotationAddRequestDto.getHddId())
                .ssdId(quotationAddRequestDto.getHddId())
                .caseId(quotationAddRequestDto.getCaseId())
                .coolerId(quotationAddRequestDto.getCoolerId())
                .name(quotationAddRequestDto.getName())
                .build();

        Integer quotationId = quotationRepository.save(quotation).getId();

        return quotationId;
    }

    @Override
    public void removeQuotation(Integer quotationId, Integer userId) {
        Quotation quotation = checkAuthority(quotationId, userId);

        quotation.removeQuotation();

        quotationRepository.save(quotation);
    }

    @Override
    public Integer modifyQuotation(QuotationModifyRequestDto quotationModifyRequestDto, Integer userId) {
        Quotation quotation = checkAuthority(quotationModifyRequestDto.getQuotationId(), userId);

        quotation.updateQuotation(
                quotationModifyRequestDto.getCpuId(),
                quotationModifyRequestDto.getGraphicId(),
                quotationModifyRequestDto.getRamId(),
                quotationModifyRequestDto.getHddId(),
                quotationModifyRequestDto.getSsdId(),
                quotationModifyRequestDto.getPowerId(),
                quotationModifyRequestDto.getMainboardId(),
                quotationModifyRequestDto.getCoolerId(),
                quotationModifyRequestDto.getCaseId(),
                quotationModifyRequestDto.getName()
        );

        return quotationRepository.save(quotation).getId();
    }

    private Quotation checkAuthority(Integer quotationId, Integer userId) {
        Quotation quotation = quotationRepository.findById(quotationId).orElseThrow(() -> new NotFoundException(Quotation.class, quotationId));

        if(!quotation.getUserId().equals(userId)) {
            throw new InvalidException(Quotation.class, quotationId);
        }

        return quotation;
    }

}
