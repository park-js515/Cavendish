package com.windows33.cavendish.domain.part.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "ram")
@Entity
public class Ram extends PartCommonEntity {

    private String generation;

    private Float capacity;

    private Integer clock;

    private String timing;

    private Integer number;

    private Integer ecc;

    private Integer xmp;

    private Integer expo;

    private Integer heatsink;

    private String heatsinkColor;

    private Integer led;

    private String ledColor;

}
