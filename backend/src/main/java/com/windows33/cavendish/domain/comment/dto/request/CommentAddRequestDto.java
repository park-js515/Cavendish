package com.windows33.cavendish.domain.comment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentAddRequestDto {

    private Integer boardId;
    private String contents;

}
