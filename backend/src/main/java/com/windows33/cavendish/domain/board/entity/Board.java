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
    private int id;

    private int userId;

    private int quotationId;

    private String title;

    private String contents;

    @Column(insertable = false)
    private Timestamp createDateTime;

    @Column(insertable = false)
    private Byte status;

    @Column(insertable = false)
    int view;

    @Column(insertable = false)
    int like;

}
