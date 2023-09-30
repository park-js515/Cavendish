package com.windows33.cavendish.domain.comment.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.comment.dto.response.CommentListResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.windows33.cavendish.domain.comment.entity.QComment.comment;
import static com.windows33.cavendish.domain.member.entity.QMember.member;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 댓글 목록 조회
     */
    public Page<CommentListResponseDto> findCommentList(Integer boardId, Pageable pageable, Integer userId) {
        BooleanExpression isMine;
        if(userId != null) {
            isMine = comment.userId.eq(userId);
        } else {
            isMine = Expressions.FALSE;
        }

        List<CommentListResponseDto> commentList = jpaQueryFactory
                .select(Projections.constructor(CommentListResponseDto.class,
                        comment.id,
                        member.nickname,
                        comment.contents,
                        comment.createDateTime,
                        isMine
                ))
                .from(comment)
                .where(comment.boardId.eq(boardId))
                .leftJoin(member).on(comment.userId.eq(member.id))
                .orderBy(commentSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long count = jpaQueryFactory
                .select(comment.count())
                .from(comment)
                .fetchCount();

        return new PageImpl<>(commentList, pageable, count);
    }

    private OrderSpecifier<?> commentSort(Pageable page) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "contents":
                        return new OrderSpecifier(direction, comment.contents);
                    case "createDateTime":
                        return new OrderSpecifier(direction, comment.createDateTime);
                }
            }
        }
        return null;
    }

}
