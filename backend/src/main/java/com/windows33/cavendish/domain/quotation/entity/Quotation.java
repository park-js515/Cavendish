package com.windows33.cavendish.domain.quotation.entity;

import com.windows33.cavendish.global.converter.DateToStringConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "quotation")
@Entity
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private Integer cpuId;

    private Integer gpuId;

    private Integer ramId;

    private Integer hddId;

    private Integer ssdId;

    private Integer powerId;

    private Integer mainboardId;

    private Integer coolerId;

    private Integer caseId;

    private String name;

    @Column(insertable = false)
    private Integer state;

    @Convert(converter = DateToStringConverter.class)
    @Column(insertable = false)
    private String createDateTime;

}
