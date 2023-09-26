package com.windows33.cavendish.domain.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyRequestDto {

    private Integer quotationId;
    private String title;
    private String contents;

}