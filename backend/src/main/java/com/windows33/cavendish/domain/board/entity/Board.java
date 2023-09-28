package com.windows33.cavendish.domain.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

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

    @Column(insertable = false)
    private Timestamp createDate;

    @Column(insertable = false)
    private Byte status;

    @Column(insertable = false)
    private Integer view;

    @Column(insertable = false)
    private Integer likeCnt;

    public void updateBoard(Integer quotationId, String title, String contents) {
        if(quotationId != null) this.quotationId = quotationId;
        if(title != null) this.title = title;
        if(contents != null) this.contents = contents;
    }

}
