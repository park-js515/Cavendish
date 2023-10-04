package com.windows33.cavendish.domain.part.cooler.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "cooler")
@Entity
public class Cooler extends PartCommonEntity {

    private String category;

    private Integer coolingType;

    private Integer aircoolForm;

    private Integer tdp;

    private Integer intelSocket;

    private Integer amdSocket;

    private Integer fanSize;

    private Integer fanCount;

    private Integer airflow;

    private Float noise;

    private Float width;

    private Float length;

    private Float height;

    private Integer radiator;

    private Float radiatorLength;

    private Float radiatorTickness;

    private Float hoseLength;

    private Integer feature;

    private Integer asYears;

    private Double radiatorThickness;

}