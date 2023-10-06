package com.windows33.cavendish.domain.comment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentListResponseDto {

    private Integer commentId;
    private String nickname;
    private String contents;
    private String createDateTime;
    private Boolean isMine;

}
