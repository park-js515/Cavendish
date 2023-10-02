package com.windows33.cavendish.domain.part_bookmark.entity;

import com.windows33.cavendish.global.converter.DateToStringConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "part_bookmark")
@Entity
public class PartBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer userId;

    private Integer partCategory;

    private Integer partId;

    @Convert(converter= DateToStringConverter.class)
    @Column(insertable = false)
    private String createDateTime;

}
