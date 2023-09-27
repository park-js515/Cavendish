package com.windows33.cavendish.domain.board.dto.response;

import com.windows33.cavendish.domain.board.dto.component.BoardDetailComponentDto;
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

    public void setBoardData(BoardDetailComponentDto boardDetailComponentDto) {
        this.nickname = boardDetailComponentDto.getNickname();
        this.title = boardDetailComponentDto.getTitle();
        this.contents = boardDetailComponentDto.getContents();
        this.quotationId = boardDetailComponentDto.getQuotationId();
        this.createDateTime = boardDetailComponentDto.getCreateDateTime();
        this.view = boardDetailComponentDto.getView();
        this.like = boardDetailComponentDto.getLike();
        this.isMine = boardDetailComponentDto.getIsMine();
    }

}