package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.comment.dto.response.CommentListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentQueryService {

    Page<CommentListResponseDto> findCommentList(Pageable pageable, Integer userId);

}
