package com.windows33.cavendish.domain.board.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.windows33.cavendish.domain.board.dto.component.BoardDetailComponentDto;
import com.windows33.cavendish.domain.board.dto.component.BoardModifyFormComponentDto;
import com.windows33.cavendish.domain.board.dto.component.BoardModifyFormImageComponentDto;
import com.windows33.cavendish.domain.board.dto.response.BoardDetailResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardListResponseDto;
import com.windows33.cavendish.domain.board.dto.response.BoardModifyFormResponseDto;
import com.windows33.cavendish.global.common.BoardSearchType;
import com.windows33.cavendish.global.exception.FileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import static com.windows33.cavendish.domain.board.entity.QBoard.board;
import static com.windows33.cavendish.domain.board.entity.QBoardImage.boardImage;
import static com.windows33.cavendish.domain.member.entity.QMember.member;

@Slf4j
@Repository
@RequiredArgsConstructor
public class BoardQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 글 목록 조회
     */
    public Page<BoardListResponseDto> findBoardList(Pageable pageable, String type, Integer userId) {
        BooleanBuilder builder = new BooleanBuilder();
        if(type != null && type.equals(BoardSearchType.MY.name()) && userId != null) {
            builder.and(board.userId.eq(userId));
        }

        List<BoardListResponseDto> boardList = jpaQueryFactory
                .select(Projections.constructor(BoardListResponseDto.class,
                        board.id,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.createDateTime,
                        board.view,
                        board.likeCnt
                ))
                .from(board)
                .where(builder)
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

    private OrderSpecifier<?> boardSort(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "title":
                    return new OrderSpecifier(direction, board.title);
                    case "contents":
                        return new OrderSpecifier(direction, board.contents);
                    case "createDateTime":
                        return new OrderSpecifier(direction, board.createDateTime);
                    case "like":
                        return new OrderSpecifier(direction, board.likeCnt);
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

        BoardDetailComponentDto boardDetailComponentDto = jpaQueryFactory
                .select(Projections.constructor(BoardDetailComponentDto.class,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.quotationId,
                        board.createDateTime,
                        board.view,
                        board.likeCnt,
                        isMine))
                .from(board)
                .leftJoin(member).on(board.userId.eq(member.id))
                .where(board.id.eq(boardId))
                .fetchOne();

        // images
        List<Integer> images = jpaQueryFactory
                .select(boardImage.id)
                .from(boardImage)
                .where(board.id.eq(boardId))
                .leftJoin(board).on(boardImage.boardId.eq(board.id))
                .fetch();

        boardDetailResponseDto.setBoardDetailComponent(boardDetailComponentDto);
        boardDetailResponseDto.setImages(images);

        return boardDetailResponseDto;
    }

    /**
     * 글 수정 Interface
     */
    public BoardModifyFormResponseDto findBoardUpdateForm(Integer boardId, Integer userId) {
        List<BoardModifyFormImageComponentDto> images = new ArrayList();

        BoardModifyFormComponentDto boardModifyFormComponentDto = jpaQueryFactory
                .select(Projections.constructor(BoardModifyFormComponentDto.class,
                        member.nickname,
                        board.title,
                        board.contents,
                        board.quotationId,
                        board.createDateTime,
                        board.view,
                        board.likeCnt))
                .from(board)
                .leftJoin(member).on(board.userId.eq(member.id))
                .where(board.id.eq(boardId))
                .fetchOne();

        // image ids
        List<Integer> ids = jpaQueryFactory
                .select(boardImage.id)
                .from(boardImage)
                .where(boardImage.boardId.eq(boardId))
                .fetch();

        // image ids + files
        for(Integer id : ids) {
            String imagePath = jpaQueryFactory
                    .select(boardImage.imagePath)
                    .from(boardImage)
                    .where(boardImage.id.eq(id))
                    .fetchOne();

            File data = new File(imagePath);

            byte[] image = null;

            try {
                image = Files.readAllBytes(data.toPath());
            } catch(Exception e) {
                log.error("File: Cannot be converted to byte array");
                throw new FileException(File.class);
            }

            // 예외 처리 필요
            images.add(new BoardModifyFormImageComponentDto(image, id));
        }

        BoardModifyFormResponseDto boardModifyFormResponseDto = new BoardModifyFormResponseDto();
        boardModifyFormResponseDto.setBoardModifyFormComponent(boardModifyFormComponentDto);
        boardModifyFormResponseDto.setImages(images);

        return boardModifyFormResponseDto;
    }

}