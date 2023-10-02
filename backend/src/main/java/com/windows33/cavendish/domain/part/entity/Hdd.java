package com.windows33.cavendish.domain.part.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "hdd")
@Entity
public class Hdd extends PartCommonEntity {

    private Double size;

    private Integer capacity;

    @Column(name = "interface")
    private String hddInterface;

    private Integer rpm;

    private Integer transferRate;

    private Integer bufferCapacity;

    private Integer recordingMethod;

    private Float thickness;

    private Integer asYear;

    private String asYears;

}
