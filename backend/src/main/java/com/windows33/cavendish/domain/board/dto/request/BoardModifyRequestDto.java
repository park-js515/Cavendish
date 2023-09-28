package com.windows33.cavendish.domain.board.dto.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyRequestDto {

    private Integer id;
    private Integer quotationId;
    private String title;
    private String contents;
    private List<Integer> deleteImage;

}