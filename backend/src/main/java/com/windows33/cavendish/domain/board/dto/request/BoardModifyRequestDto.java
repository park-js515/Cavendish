package com.windows33.cavendish.domain.board.dto.request;

import com.windows33.cavendish.domain.board.dto.component.BoardModifyFormImageComponentDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyRequestDto {

    private Integer quotationId;
    private String title;
    private String contents;
    private List<BoardModifyFormImageComponentDto> images;

}