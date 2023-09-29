package com.windows33.cavendish.domain.comment.service;

import com.windows33.cavendish.domain.board.entity.Board;
import com.windows33.cavendish.domain.comment.dto.request.CommentAddRequestDto;
import com.windows33.cavendish.domain.comment.dto.request.CommentModifyRequestDto;
import com.windows33.cavendish.domain.comment.entity.Comment;
import com.windows33.cavendish.domain.comment.repository.CommentRepository;
import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.NotFoundException;
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

    @Override
    public void removeComment(Integer commentId, Integer userId) {
        Comment comment = checkAuthority(commentId, userId);

        commentRepository.delete(comment);
    }

    @Override
    public Integer modifyComment(CommentModifyRequestDto commentModifyRequestDto, Integer userId) {
        Comment comment = checkAuthority(commentModifyRequestDto.getCommentId(), userId);

        comment.updateComment(commentModifyRequestDto.getContents());

        return commentRepository.save(comment).getId();
    }

    private Comment checkAuthority(Integer commentId, Integer userId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(Board.class, commentId));

        if(!comment.getUserId().equals(userId)) {
            throw new InvalidException(Board.class, commentId);
        }

        return comment;
    }

}