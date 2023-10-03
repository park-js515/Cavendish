package com.windows33.cavendish.domain.part_bookmark.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.part_bookmark.dto.response.PartBookmarkListDto;
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
import static com.windows33.cavendish.domain.part_bookmark.entity.QPartBookmark.partBookmark;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PartBookmarkQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * cpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkCpuList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        cpu.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        cpu.image,
                        cpu.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(0)))
                .leftJoin(cpu).on(partBookmark.partId.eq(cpu.id))
                .orderBy(partBookmarkSort(pageable, 0))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(0)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * gpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkGpuList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        gpu.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        gpu.image,
                        gpu.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(1)))
                .leftJoin(gpu).on(partBookmark.partId.eq(gpu.id))
                .orderBy(partBookmarkSort(pageable, 1))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(1)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * ram
     */
    public Page<PartBookmarkListDto> findPartBookmarkRamList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        ram.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        ram.image,
                        ram.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(2)))
                .leftJoin(ram).on(partBookmark.partId.eq(ram.id))
                .orderBy(partBookmarkSort(pageable, 2))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(2)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * hdd
     */
    public Page<PartBookmarkListDto> findPartBookmarkHddList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        hdd.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        hdd.image,
                        hdd.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(3)))
                .leftJoin(hdd).on(partBookmark.partId.eq(hdd.id))
                .orderBy(partBookmarkSort(pageable, 3))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(3)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * ssd
     */
    public Page<PartBookmarkListDto> findPartBookmarkSsdList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        ssd.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        ssd.image,
                        ssd.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(4)))
                .leftJoin(ssd).on(partBookmark.partId.eq(ssd.id))
                .orderBy(partBookmarkSort(pageable, 4))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(4)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * cpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkPowerList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        power.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        power.image,
                        power.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(5)))
                .leftJoin(power).on(partBookmark.partId.eq(power.id))
                .orderBy(partBookmarkSort(pageable, 5))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(5)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * cpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkMainboardList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        mainboard.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        mainboard.image,
                        mainboard.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(6)))
                .leftJoin(mainboard).on(partBookmark.partId.eq(mainboard.id))
                .orderBy(partBookmarkSort(pageable, 6))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(6)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * cpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkCoolerList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        cooler.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        cooler.image,
                        cooler.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(7)))
                .leftJoin(cooler).on(partBookmark.partId.eq(cooler.id))
                .orderBy(partBookmarkSort(pageable, 7))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(7)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    /**
     * cpu
     */
    public Page<PartBookmarkListDto> findPartBookmarkCaseList(Pageable pageable, Integer userId) {
        List<PartBookmarkListDto> partBookmarkList = jpaQueryFactory
                .select(Projections.constructor(PartBookmarkListDto.class,
                        computerCase.name,
                        partBookmark.partCategory,
                        partBookmark.partId,
                        computerCase.image,
                        computerCase.price
                ))
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(8)))
                .leftJoin(computerCase).on(partBookmark.partId.eq(computerCase.id))
                .orderBy(partBookmarkSort(pageable, 8))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(partBookmark.count())
                .from(partBookmark)
                .where(partBookmark.userId.eq(userId).and(partBookmark.partCategory.eq(8)))
                .fetchCount();

        return new PageImpl<>(partBookmarkList, pageable, count);
    }

    private OrderSpecifier<?> partBookmarkSort(Pageable pageable, Integer category) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "name":
                        return new OrderSpecifier(direction, partBookmark.name);
                    case "createDateTime":
                        return new OrderSpecifier(direction, partBookmark.createDateTime);
                    case "price":
                        switch(category) {
                            case 0:
                                return new OrderSpecifier(direction, cpu.price);
                            case 1:
                                return new OrderSpecifier(direction, gpu.price);
                            case 2:
                                return new OrderSpecifier(direction, ram.price);
                            case 3:
                                return new OrderSpecifier(direction, hdd.price);
                            case 4:
                                return new OrderSpecifier(direction, ssd.price);
                            case 5:
                                return new OrderSpecifier(direction, power.price);
                            case 6:
                                return new OrderSpecifier(direction, mainboard.price);
                            case 7:
                                return new OrderSpecifier(direction, cooler.price);
                            case 8:
                                return new OrderSpecifier(direction, computerCase.price);
                        }
                }
            }
        }
        return null;
    }

}
