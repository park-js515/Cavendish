package com.windows33.cavendish.domain.board.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.board.dto.data.BoardDataDto;
import com.windows33.cavendish.domain.board.dto.response.BoardDetailResponseDto;
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
import static com.windows33.cavendish.domain.board.entity.QBoardImage.boardImage;
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
    public Page<BoardListResponseDto> findBoardList(Pageable pageable) {
        List<BoardListResponseDto> boardList = jpaQueryFactory
                .select(Projections.constructor(BoardListResponseDto.class,
                        board.id,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.createDate,
                        board.view,
                        board.like
                ))
                .from(board)
                .leftJoin(member).on(board.userId.eq(member.id))
                .orderBy(boardSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(board.count())
                .from(board)
                .fetchCount();

        return new PageImpl<>(boardList, pageable, count);
    }

    private OrderSpecifier<?> boardSort(Pageable page) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "title":
                        return new OrderSpecifier(direction, board.title);
                    case "contents":
                        return new OrderSpecifier(direction, board.contents);
                    case "createdDate":
                        return new OrderSpecifier(direction, board.createDate);
                    case "like":
                        return new OrderSpecifier(direction, board.like);
                    case "view":
                        return new OrderSpecifier(direction, board.view);
                }
            }
        }
        return null;
    }

    /**
     * 글 상세 조회
     */
    public BoardDetailResponseDto findBoardDetail(Integer boardId, Integer userId) {
        BoardDetailResponseDto boardDetailResponseDto = new BoardDetailResponseDto();

        // 동적 쿼리
        BooleanExpression isMine;
        if(userId != null) {
            isMine = board.userId.eq(userId);
        } else {
            isMine = Expressions.FALSE;
        }

        BoardDataDto boardDataDto = jpaQueryFactory
                .select(Projections.constructor(BoardDataDto.class,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.quotationId,
                        board.createDate,
                        board.view,
                        board.like,
                        isMine))
                .from(board)
                .leftJoin(member).on(board.userId.eq(member.id))
                .where(board.id.eq(boardId))
                .fetchOne();

        // images
        List<String> images = jpaQueryFactory
                .select(boardImage.imagePath)
                .from(boardImage)
                .where(board.id.eq(boardId))
                .leftJoin(board).on(boardImage.boardId.eq(board.id))
                .fetch();

        boardDetailResponseDto.setBoardData(boardDataDto);
        boardDetailResponseDto.setImages(images);

        return boardDetailResponseDto;
    }

}