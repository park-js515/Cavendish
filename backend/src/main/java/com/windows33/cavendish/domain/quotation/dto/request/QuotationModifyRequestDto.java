package com.windows33.cavendish.domain.quotation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationModifyRequestDto {

    private Integer quotationId;
    private String name;

    // cpu
    private Integer cpuId;
    private Boolean hasCpu;

    // power
    private Integer powerId;
    private Boolean hasPower;

    // mainboard
    private Integer mainboardId;
    private Boolean hasMainboard;

    // ram
    private Integer ramId;
    private Boolean hasRam;

    // gpu
    private Integer gpuId;
    private Boolean hasGpu;

    // hdd
    private Integer hddId;
    private Boolean hasHdd;

    // ssd
    private Integer ssdId;
    private Boolean hasSsd;

    // case
    private Integer caseId;
    private Boolean hasCase;

    // cooler
    private Integer coolerId;
    private Boolean hasCooler;

}