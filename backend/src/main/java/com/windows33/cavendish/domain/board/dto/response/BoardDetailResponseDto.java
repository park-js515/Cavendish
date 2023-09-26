package com.windows33.cavendish.domain.board.dto.response;

import com.windows33.cavendish.domain.board.dto.data.BoardDataDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponseDto {

    private String nickname;
    private String title;
    private String contents;
    private Integer quotationId;
    private Timestamp createDateTime;
    private Integer view;
    private Integer like;
    private Boolean isMine;
    private List<String> images = new ArrayList<>();

    public void setBoardData(BoardDataDto boardDataDto) {
        this.nickname = boardDataDto.getNickname();
        // 작업중
    }

}