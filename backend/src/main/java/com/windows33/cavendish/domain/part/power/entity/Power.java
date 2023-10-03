package com.windows33.cavendish.domain.part.power.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "power")
@Entity
public class Power extends PartCommonEntity {

    private String category;

    private Integer ratedPower;

    @Column(name = "80plus_certification")
    private String plusCertification;

    private String etaCertification;

    private String lambdaCertification;

    private Float voltageFluctuation;

    private String outputMethod;

    private Integer availability;

    private String pfcCircuit;

    private Integer pfFactor;

    private Integer fanSize;

    private Integer fanNumber;

    private String bearing;

    private Float output12v;

    private String cableConnection;

    private Integer depth;

    private String mainPower;

    private String subPower;

    private Integer pcie16pin;

    private Integer pcie8pin;

    private Integer pcie6pin;

    private Integer sata;

    private Integer ide4;

    private Integer rgbConnector;

    private Integer feature;

    private Integer inside;

    private Integer protection;

    private Integer asYears;

}
