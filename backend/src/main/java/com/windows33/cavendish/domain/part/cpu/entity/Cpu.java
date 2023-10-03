package com.windows33.cavendish.domain.part.cpu.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "cpu")
@Entity
public class Cpu extends PartCommonEntity {

    private String code;

    private String socket;

    private Integer coreNumber;

    private Integer threadNumber;

    private Integer l2Cache;

    private Integer l3Cache;

    private Integer tdp;

    private Integer pbpmtp;

    private Integer hasGraphic;

    private String graphicName;

    private Integer graphicCoreSpeed;

    private Integer memoryCapacity;

    private Integer memoryType;

    private Integer memoryClock;

    private Integer memoryChannel;

    private Integer pcieVersion;

    private Integer pcieChannelNumber;

    private Integer hasCooler;

    private Float clockBasic;

    private Float clockMax;

    private Integer nm;

    private String techSupport;

    private Integer benchMark;

}
