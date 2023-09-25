package com.windows33.cavendish.domain.board.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import com.windows33.cavendish.domain.board.entity.QBoard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.windows33.cavendish.domain.board.entity.QBoard.board;
import static com.windows33.cavendish.domain.member.entity.QMember.member;
import static org.hibernate.internal.util.NullnessHelper.coalesce;

@Slf4j
@Repository
@RequiredArgsConstructor
public class BoardQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 글 목록 조회
     */
    public Page<BoardListResponseDto> findBoardList(Pageable pageable, Integer id) {

        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        List<BoardListResponseDto> boardList = jpaQueryFactory
                .select(Projections.constructor(BoardListResponseDto.class,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.createDate,
                        board.view,
                        board.like,
                        board.userId.eq(id)
                ))
                .from(board)
                .leftJoin(member).on(board.userId.eq(member.id))
                .orderBy(new OrderSpecifier<>(Order.DESC, post.id))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(board.count())
                .from(board)
                .fetchCount();

        return new PageImpl<>(boardList, pageable, count);
    }

    private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {
        List<OrderSpecifier> ORDERS = new ArrayList<>();

        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "createdDate":
                        OrderSpecifier<?> createdDate = QueryDslUtil
                                .getSortedColumn(direction, Qnotice.notice, "createdDate");
                        ORDERS.add(createdDate);
                        break;
                    default:
                        break;
                }
            }
        }

        return ORDERS;
    }

}
