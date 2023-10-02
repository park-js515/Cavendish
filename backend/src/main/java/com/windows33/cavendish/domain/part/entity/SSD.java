package com.windows33.cavendish.domain.part.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "ssd")
@Entity
public class SSD extends PartCommonEntity {

    private String formFactor;

    private String ssdInterface;

    private String protocol;

    private Integer volume;

    private String memoryType;

    private String nand;

    private Integer ramMounted;

    private String ramType;

    private Integer sequentialRead;

    private Integer sequentialWrite;

    private Integer readIops;

    private Integer writeIops;

    private Integer heatsink;

    private Integer rgbled;

    private Integer asYear;

    private Integer supportOption;

}
