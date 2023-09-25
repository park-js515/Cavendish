package com.windows33.cavendish.domain.board.repository;

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
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
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
                .fetch();

        long count = jpaQueryFactory
                .select(board.count())
                .from(board)
                .fetchCount();

        return new PageImpl<>(boardList, pageable, count);
    }

}
