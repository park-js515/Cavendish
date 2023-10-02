package com.windows33.cavendish.domain.quotation.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
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
import static com.windows33.cavendish.domain.part.entity.QCooler.cooler;
import static com.windows33.cavendish.domain.part.entity.QCpu.cpu;
import static com.windows33.cavendish.domain.part.entity.QGpu.gpu;
import static com.windows33.cavendish.domain.part.entity.QHdd.hdd;
import static com.windows33.cavendish.domain.part.entity.QMainboard.mainboard;
import static com.windows33.cavendish.domain.part.entity.QPower.power;
import static com.windows33.cavendish.domain.part.entity.QRam.ram;
import static com.windows33.cavendish.domain.part.entity.QSsd.ssd;
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
        Integer computerCasePrice = 0;

        List<QuotationListResponseDto> quotationList = jpaQueryFactory
                .select(Projections.constructor(QuotationListResponseDto.class,
                        quotation.id,
                        quotation.name,
                        computerCase.image,
                        Expressions.asNumber(0),
                        quotation.createDateTime
                ))
                .from(quotation)
                .where(quotation.userId.eq(userId).and(quotation.state.eq(0)))
                .leftJoin(computerCase).on(quotation.caseId.eq(computerCase.id))
                .orderBy(quotationSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        for(QuotationListResponseDto quotationListResponseDto : quotationList) {
            cpuPrice = jpaQueryFactory
                    .select(cpu.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(cpu).on(quotation.cpuId.eq(cpu.id))
                    .fetchOne();

            gpuPrice = jpaQueryFactory
                    .select(gpu.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(gpu).on(quotation.gpuId.eq(gpu.id))
                    .fetchOne();

            ramPrice = jpaQueryFactory
                    .select(ram.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(ram).on(quotation.ramId.eq(ram.id))
                    .fetchOne();

            hddPrice = jpaQueryFactory
                    .select(hdd.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(hdd).on(quotation.hddId.eq(hdd.id))
                    .fetchOne();

            ssdPrice = jpaQueryFactory
                    .select(ssd.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(ssd).on(quotation.ssdId.eq(ssd.id))
                    .fetchOne();

            powerPrice = jpaQueryFactory
                    .select(power.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(power).on(quotation.powerId.eq(power.id))
                    .fetchOne();

            mainboardPrice = jpaQueryFactory
                    .select(mainboard.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(mainboard).on(quotation.mainboardId.eq(mainboard.id))
                    .fetchOne();

            coolerPrice = jpaQueryFactory
                    .select(cooler.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(cooler).on(quotation.coolerId.eq(cooler.id))
                    .fetchOne();

            computerCasePrice = jpaQueryFactory
                    .select(computerCase.price)
                    .from(quotation)
                    .where(quotation.id.eq(quotationListResponseDto.getQuotationId()))
                    .leftJoin(computerCase).on(quotation.caseId.eq(computerCase.id))
                    .fetchOne();

            quotationListResponseDto.setTotalPrice(
                    (cpuPrice == null?0:cpuPrice) + (gpuPrice==null ?0:gpuPrice) + (ramPrice==null ? 0:ramPrice) + (hddPrice==null?0:hddPrice) + (ssdPrice==null?0:ssdPrice) + (powerPrice==null?0:powerPrice) + (mainboardPrice==null?0:mainboardPrice) + (coolerPrice==null?0:coolerPrice) + (computerCasePrice==null?0:computerCasePrice)
            );
        }

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
