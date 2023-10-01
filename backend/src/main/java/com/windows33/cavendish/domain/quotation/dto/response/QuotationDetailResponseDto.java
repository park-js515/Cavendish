package com.windows33.cavendish.domain.quotation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationDetailResponseDto {

    private String name;

    // cpu
    private Integer cpuId;
    private String cpuName;
    private Integer cpuPrice;

    // gpu
    private Integer gpuId;
    private String gpuName;
    private Integer gpuPrice;

    // ram
    private Integer ramId;
    private String ramName;
    private Integer ramPrice;

    // hdd
    private Integer hddId;
    private String hddName;
    private Integer hddPrice;

    // ssd
    private Integer ssdId;
    private String ssdName;
    private Integer ssdPrice;

    // power
    private Integer powerId;
    private String powerName;
    private Integer powerPrice;

    // mainboard
    private Integer mainboardId;
    private String mainboardName;
    private Integer mainboardPrice;

    // cooler
    private Integer coolerId;
    private String coolerName;
    private Integer coolerPrice;

    // case
    private Integer caseId;
    private String caseName;
    private Integer casePrice;

    private Integer totalPrice;
    private String createDateTime;

}