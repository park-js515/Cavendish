package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.comment.dto.request.CommentAddRequestDto;

public interface CommentService {

    Integer addComment(CommentAddRequestDto commentAddRequestDto, Integer userId);

    void removeComment(Integer commentId, Integer userId);

}
