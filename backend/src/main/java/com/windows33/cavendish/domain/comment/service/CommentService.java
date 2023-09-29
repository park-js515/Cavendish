package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.comment.dto.request.CommentAddRequestDto;
import com.windows33.cavendish.domain.comment.dto.request.CommentModifyRequestDto;

public interface CommentService {

    Integer addComment(CommentAddRequestDto commentAddRequestDto, Integer userId);

    void removeComment(Integer commentId, Integer userId);

    Integer modifyComment(CommentModifyRequestDto commentModifyRequestDto, Integer userId);

}
