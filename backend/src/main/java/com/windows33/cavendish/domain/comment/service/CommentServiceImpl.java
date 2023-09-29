package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.comment.dto.request.CommentAddRequestDto;
import com.windows33.cavendish.domain.comment.entity.Comment;
import com.windows33.cavendish.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Integer addComment(CommentAddRequestDto commentAddRequestDto, Integer userId) {
        Comment.CommentBuilder comment = Comment.builder()
                .boardId(commentAddRequestDto.getBoardId())
                .userId(userId)
                .contents(commentAddRequestDto.getContents());

        Integer commentId = commentRepository.save(comment.build()).getId();

        return commentId;
    }

}