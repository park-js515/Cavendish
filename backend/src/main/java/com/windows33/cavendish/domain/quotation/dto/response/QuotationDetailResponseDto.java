package com.windows33.cavendish.domain.quotation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationDetailResponseDto {

    private Integer quotationId;
    private String name;

    // cpu
    private Integer cpuId;
    private String cpuName;
    private Integer cpuPrice;
    private String cpuImage;
    private Boolean hasCpu;

    // gpu
    private Integer gpuId;
    private String gpuName;
    private Integer gpuPrice;
    private String gpuImage;
    private Boolean hasGpu;

    // ram
    private Integer ramId;
    private String ramName;
    private Integer ramPrice;
    private String ramImage;
    private Boolean hasRam;

    // hdd
    private Integer hddId;
    private String hddName;
    private Integer hddPrice;
    private String hddImage;
    private Boolean hasHdd;

    // ssd
    private Integer ssdId;
    private String ssdName;
    private Integer ssdPrice;
    private String ssdImage;
    private Boolean hasSsd;

    // power
    private Integer powerId;
    private String powerName;
    private Integer powerPrice;
    private String powerImage;
    private Boolean hasPower;

    // mainboard
    private Integer mainboardId;
    private String mainboardName;
    private Integer mainboardPrice;
    private String mainboardImage;
    private Boolean hasMainboard;

    // cooler
    private Integer coolerId;
    private String coolerName;
    private Integer coolerPrice;
    private String coolerImage;
    private Boolean hasCooler;

    // case
    private Integer caseId;
    private String caseName;
    private Integer casePrice;
    private String caseImage;
    private Boolean hasCase;

    private Integer totalPrice;
    private String createDateTime;

}