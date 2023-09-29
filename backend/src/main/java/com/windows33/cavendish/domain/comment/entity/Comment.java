package com.windows33.cavendish.domain.comment.entity;

import com.windows33.cavendish.global.converter.DateToStringConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "comments")
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer boardId;

    @Column
    private Integer userId;

    @Column
    private String contents;

    @Column(insertable = false)
    @Convert(converter= DateToStringConverter.class)
    private String createDateTime;

    @Column(insertable = false)
    private Byte status;

}
