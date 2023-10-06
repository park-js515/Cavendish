package com.windows33.cavendish.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Getter
@SuperBuilder
@MappedSuperclass
@NoArgsConstructor
public class PartCommonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer price;

    private String link;

    private String company;

    private Integer productSeq;

    private String image;

    private Integer bookMark;

    private Integer regDate;

}
