package com.windows33.cavendish.domain.board.dto.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyFormImageComponentDto {

    private byte[] file;
    private Integer imageId;

}
