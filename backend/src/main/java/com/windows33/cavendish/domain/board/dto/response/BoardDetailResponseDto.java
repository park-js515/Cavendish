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
    private List<Integer> images = new ArrayList<>();

    public void setBoardData(BoardDataDto boardDataDto) {
        this.nickname = boardDataDto.getNickname();
        this.title = boardDataDto.getTitle();
        this.contents = boardDataDto.getContents();
        this.quotationId = boardDataDto.getQuotationId();
        this.createDateTime = boardDataDto.getCreateDateTime();
        this.view = boardDataDto.getView();
        this.like = boardDataDto.getLike();
        this.isMine = boardDataDto.getIsMine();
    }

}