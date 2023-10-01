package com.windows33.cavendish.domain.quotation.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.quotation.dto.response.QuotationDetailResponseDto;
import com.windows33.cavendish.domain.quotation.dto.response.QuotationListResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.windows33.cavendish.domain.part.entity.QComputerCase.computerCase;
import static com.windows33.cavendish.domain.quotation.entity.QQuotation.quotation;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QuotationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<QuotationListResponseDto> findQuotationList(Pageable pageable, Integer userId) {
        Integer cpuPrice = 0;
        Integer gpuPrice = 0;
        Integer ramPrice = 0;
        Integer hddPrice = 0;
        Integer ssdPrice = 0;
        Integer powerPrice = 0;
        Integer mainboardPrice = 0;
        Integer coolerPrice = 0;
        Integer casePrice = 0;

        // totalPrice 연산 필요

        List<QuotationListResponseDto> quotationList = jpaQueryFactory
                .select(Projections.constructor(QuotationListResponseDto.class,
                        quotation.id,
                        quotation.name,
                        computerCase.image,
                        quotation.createDateTime
                ))
                .from(quotation)
                .where(quotation.userId.eq(userId).and(quotation.state.eq(0)))
                .leftJoin(computerCase).on(quotation.caseId.eq(computerCase.id))
                .orderBy(quotationSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(quotation.count())
                .from(quotation)
                .fetchCount();

        return new PageImpl<>(quotationList, pageable, count);
    }

    private OrderSpecifier<?> quotationSort(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "name":
                        return new OrderSpecifier(direction, quotation.name);
                    case "createDateTime":
                        return new OrderSpecifier(direction, quotation.createDateTime);
                }
            }
        }
        return null;
    }

    public QuotationDetailResponseDto findQuotationDetail(Integer quotationId) {
        QuotationDetailResponseDto quotationDetailResponseDto = jpaQueryFactory
                .select(Projections.constructor(QuotationDetailResponseDto.class,
                        quotation.name,
                        quotation.cpuId,
                        quotation.gpuId,
                        quotation.ramId,
                        quotation.hddId,
                        quotation.ssdId,
                        quotation.powerId,
                        quotation.mainboardId,
                        quotation.coolerId,
                        quotation.caseId,
                        quotation.createDateTime
                ))
                .from(quotation)
                .where(quotation.id.eq(quotationId))
                .fetchOne();

        return quotationDetailResponseDto;
    }

}
