package com.windows33.cavendish.domain.part.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "gpu")
@Entity
public class Gpu extends PartCommonEntity {

    private String chipsetCompany;

    private String chipset;

    private Integer nm;

    private Integer baseClock;

    private Integer boostClock;

    private Integer cudaProcessor;

    private Integer streamProcessor;

    private String Interface;

    private String memoryType;

    private Float memoryCapacity;

    private Integer memoryClock;

    private Integer memoryBus;

    private Integer port;

    private Integer monitorSupport;

    private Integer additionalFunction;

    private Integer usagePower;

    private Integer recommendPower;

    private Integer coolingType;

    private Integer panNumber;

    private Float length;

    private Float thickness;

    private String pin;

    private Integer feature;

    private Integer asYears;

    private Integer benchMark;

}
