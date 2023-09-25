package com.windows33.cavendish.domain.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardListResponseDto {

    private String nickname;
    private String title;
    private String contents;
    private Timestamp createDateTime;
    private Integer view;
    private Integer like;
    private Boolean isMine;

}