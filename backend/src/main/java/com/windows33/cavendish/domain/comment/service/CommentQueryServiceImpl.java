package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.comment.dto.response.CommentListResponseDto;
import com.windows33.cavendish.domain.comment.repository.CommentQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentQueryServiceImpl implements CommentQueryService {

    private final CommentQueryRepository commentQueryRepository;

    @Override
    public Page<CommentListResponseDto> findCommentList(Integer boardId, Pageable pageable, Integer userId) {
        return commentQueryRepository.findCommentList(boardId, pageable, userId);
    }

}