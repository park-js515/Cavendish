package com.windows33.cavendish.domain.board.dto.response;

import com.windows33.cavendish.domain.board.dto.component.BoardModifyFormComponentDto;
import com.windows33.cavendish.domain.board.dto.component.BoardModifyFormImageComponentDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyFormResponseDto {

    private String nickname;
    private String title;
    private String contents;
    private Integer quotationId;
    private Timestamp createDateTime;
    private Integer view;
    private Integer like;
    private Boolean isMine;
    private List<BoardModifyFormImageComponentDto> images;

    public void setBoardModifyFormComponent(BoardModifyFormComponentDto boardModifyFormComponentDto) {
        this.nickname = boardModifyFormComponentDto.getNickname();
        this.title = boardModifyFormComponentDto.getTitle();
        this.contents = boardModifyFormComponentDto.getContents();
        this.quotationId = boardModifyFormComponentDto.getQuotationId();
        this.createDateTime = boardModifyFormComponentDto.getCreateDateTime();
        this.view = boardModifyFormComponentDto.getView();
        this.like = boardModifyFormComponentDto.getLike();
    }

}
