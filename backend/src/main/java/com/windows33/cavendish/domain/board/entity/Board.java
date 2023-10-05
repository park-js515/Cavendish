package com.windows33.cavendish.domain.board.entity;

import com.windows33.cavendish.global.converter.DateToStringConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "boards")
@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private Integer quotationId;

    private String title;

    private String contents;

    @Convert(converter= DateToStringConverter.class)
    @Column(insertable = false)
    private String createDateTime;

    @Column(insertable = false)
    private Byte status;

    @Column(insertable = false)
    private Integer view;

    @Column(insertable = false)
    private Integer likeCnt;

    public void updateBoard(Integer quotationId, String title, String contents) {
        this.quotationId = quotationId;
        this.title = title;
        this.contents = contents;
    }

    public void increaseViewCount() {
        this.view++;
    }

    public void increaseLikeCount() {
        this.likeCnt++;
    }

    public void decreaseLikeCount() {
        this.likeCnt--;
    }

}
