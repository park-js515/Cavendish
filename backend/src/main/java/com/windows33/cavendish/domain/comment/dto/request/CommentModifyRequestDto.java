package com.windows33.cavendish.domain.comment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentModifyRequestDto {

    private Integer commentId;
    private String contents;

}
