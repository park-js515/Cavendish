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
        Integer state = calHasPartToBit(
                quotationAddRequestDto.getHasCpu(),
                quotationAddRequestDto.getHasGpu(),
                quotationAddRequestDto.getHasRam(),
                quotationAddRequestDto.getHasHdd(),
                quotationAddRequestDto.getHasSsd(),
                quotationAddRequestDto.getHasPower(),
                quotationAddRequestDto.getHasMainboard(),
                quotationAddRequestDto.getHasCooler(),
                quotationAddRequestDto.getHasCase()
        );

        Quotation quotation = Quotation.builder()
                .userId(userId)
                .cpuId(quotationAddRequestDto.getCpuId())
                .powerId(quotationAddRequestDto.getPowerId())
                .mainboardId(quotationAddRequestDto.getMainboardId())
                .ramId(quotationAddRequestDto.getRamId())
                .gpuId(quotationAddRequestDto.getGpuId())
                .hddId(quotationAddRequestDto.getHddId())
                .ssdId(quotationAddRequestDto.getHddId())
                .caseId(quotationAddRequestDto.getCaseId())
                .coolerId(quotationAddRequestDto.getCoolerId())
                .name(quotationAddRequestDto.getName())
                .state(state)
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

        Integer state = calHasPartToBit(
                quotationModifyRequestDto.getHasCpu(),
                quotationModifyRequestDto.getHasGpu(),
                quotationModifyRequestDto.getHasRam(),
                quotationModifyRequestDto.getHasHdd(),
                quotationModifyRequestDto.getHasSsd(),
                quotationModifyRequestDto.getHasPower(),
                quotationModifyRequestDto.getHasMainboard(),
                quotationModifyRequestDto.getHasCooler(),
                quotationModifyRequestDto.getHasCase()
        );

        quotation.updateQuotation(
                quotationModifyRequestDto.getCpuId(),
                quotationModifyRequestDto.getGpuId(),
                quotationModifyRequestDto.getRamId(),
                quotationModifyRequestDto.getHddId(),
                quotationModifyRequestDto.getSsdId(),
                quotationModifyRequestDto.getPowerId(),
                quotationModifyRequestDto.getMainboardId(),
                quotationModifyRequestDto.getCoolerId(),
                quotationModifyRequestDto.getCaseId(),
                quotationModifyRequestDto.getName(),
                state
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

    private Integer calHasPartToBit(
            Boolean hasCpu,
            Boolean hasGpu,
            Boolean hasRam,
            Boolean hasHdd,
            Boolean hasSsd,
            Boolean hasPower,
            Boolean hasMainboard,
            Boolean hasCooler,
            Boolean hasCase
    ) {
        Integer ans = 0;

        if(hasCpu != null && hasCpu) ans += 1 << 0;
        if(hasGpu != null && hasGpu) ans += 1 << 1;
        if(hasRam != null && hasRam) ans += 1 << 2;
        if(hasHdd != null && hasHdd) ans += 1 << 3;
        if(hasSsd != null && hasSsd) ans += 1 << 4;
        if(hasPower != null && hasPower) ans += 1 << 5;
        if(hasMainboard != null && hasMainboard) ans += 1 << 6;
        if(hasCooler != null && hasCooler) ans += 1 << 7;
        if(hasCase != null && hasCase) ans += 1 << 8;

        return ans;
    }

}
