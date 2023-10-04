package com.windows33.cavendish.domain.part.mainboard.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "mainboard")
@Entity
public class Mainboard extends PartCommonEntity {

    private String cpuSocket;

    private String chipset;

    private String formFactor;

    private String memoryType;

    private Integer memoryNumber;

    private Float memoryCapacity;

    private Integer xmp;

    private Integer expo;

    private Integer stat3Number;

    private Integer m2Number;

    private Integer m2Interface;

    private Integer m2Formfactor;

    private Integer pcieVersion;

    private String vgaConnection;

    private Integer wirelessLan;

    private Integer wiredLanSpeed;

    private Integer phase;

    private Integer graphicOutput;

    private String backPanel;

    private Integer ioHeader;

    private Integer feature;

}
